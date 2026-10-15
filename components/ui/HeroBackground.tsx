"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/*
 * Animated hero atmosphere: a grainy, slowly flowing gradient (stirred by the cursor)
 * with satin waves rolling in from the bottom and a soft light that follows the pointer
 * and swells on click. Colours come from the brand tokens in globals.css.
 *
 * Pure WebGL1 with a single full-screen triangle — no dependencies. If WebGL is missing
 * or the context is lost, the canvas stays transparent and the section's CSS gradient shows.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uPulse;
uniform vec3 uPaper;
uniform vec3 uHaze;
uniform vec3 uMist;
uniform vec3 uTide;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;           // (0,0) bottom-left
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float t = uTime;

  // Cursor gently pushes the flow field away from itself.
  vec2 d = p - m;
  float md = length(d);
  vec2 stir = (d / (md + 1e-4)) * exp(-md * md * 6.0) * 0.14;

  // Grainy flowing gradient (domain-warped fbm).
  vec2 q = p * 1.35 + stir;
  float w = fbm(q + vec2(t * 0.040, -t * 0.025));
  float n = fbm(q * 1.3 + w * 1.6 + vec2(-t * 0.030, t * 0.050));

  float h = 1.0 - uv.y;                        // 0 at top, 1 at bottom
  vec3 col = mix(uPaper, uHaze, smoothstep(0.05, 0.62, h + (n - 0.5) * 0.35));
  col = mix(col, uMist, smoothstep(0.45, 1.05, h + (n - 0.5) * 0.45));
  col = mix(col, uTide, smoothstep(0.55, 0.95, n) * 0.42 * smoothstep(0.25, 0.9, h));

  // Satin waves rolling in from a hazy horizon at the bottom.
  float body = 0.0;
  float sheen = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float freq = 1.3 + fi * 0.55;
    float y = 0.07 + fi * 0.075
      + 0.045 * sin(p.x * freq + t * (0.32 + fi * 0.07) + fi * 1.7)
      + 0.018 * sin(p.x * freq * 2.3 - t * 0.45 + fi);
    float dist = uv.y - y;
    body = max(body, (1.0 - smoothstep(-0.14, 0.0, dist)) * (1.0 - fi * 0.2));
    sheen += exp(-abs(dist) * 60.0) * (0.55 - fi * 0.11);
  }
  col = mix(col, mix(uMist, uTide, 0.6), body * 0.58);

  // A soft light that follows the pointer and swells on click.
  float light = exp(-md * md * 3.2) * (0.3 + uPulse * 0.7);
  col += sheen * (0.14 + light * 0.6);
  col += uPaper * light * 0.07;

  // Animated film grain.
  col += (hash(gl_FragCoord.xy + fract(t * 7.0) * 100.0) - 0.5) * 0.045;

  gl_FragColor = vec4(col, 1.0);
}
`;

// Mirrors globals.css so a missing or non-hex token never renders as black.
const FALLBACK: Record<string, string> = {
    "--paper": "#f7f6f3",
    "--haze": "#d3dbe4",
    "--mist": "#a8c2df",
    "--tide": "#7393bb",
};

function tokenRGB(name: string): [number, number, number] {
    let hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) hex = FALLBACK[name];
    hex = hex.slice(1);
    const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const v = parseInt(full, 16);
    return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("HeroBackground shader:", gl.getShaderInfoLog(s));
        return null;
    }
    return s;
}

export default function HeroBackground({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
        if (!gl) return;

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
        gl.useProgram(prog);

        // One oversized triangle covers the viewport.
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const u = (name: string) => gl.getUniformLocation(prog, name);
        const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uPulse = u("uPulse");
        gl.uniform3fv(u("uPaper"), tokenRGB("--paper"));
        gl.uniform3fv(u("uHaze"), tokenRGB("--haze"));
        gl.uniform3fv(u("uMist"), tokenRGB("--mist"));
        gl.uniform3fv(u("uTide"), tokenRGB("--tide"));

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5);
            const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
            const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                gl.viewport(0, 0, w, h);
            }
            gl.uniform2f(uRes, w, h);
        };

        // Pointer state, eased toward its target each frame. Without a pointer the light drifts on its own.
        const mouse = { x: 0.7, y: 0.55, tx: 0.7, ty: 0.55, active: 0 };
        let pulse = 0;

        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            if (e.clientY > r.bottom || e.clientY < r.top) return;
            mouse.tx = (e.clientX - r.left) / r.width;
            mouse.ty = 1 - (e.clientY - r.top) / r.height;
            mouse.active = performance.now();
        };
        const onDown = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            if (e.clientY <= r.bottom && e.clientY >= r.top) pulse = 1;
        };

        const reduced = prefersReducedMotion();
        const start = performance.now();
        let raf = 0;
        let visible = true;

        const draw = (now: number) => {
            const t = reduced ? 12 : (now - start) / 1000;
            if (now - mouse.active > 2500) {
                mouse.tx = 0.62 + Math.sin(t * 0.21) * 0.22;
                mouse.ty = 0.5 + Math.cos(t * 0.17) * 0.18;
            }
            mouse.x += (mouse.tx - mouse.x) * 0.06;
            mouse.y += (mouse.ty - mouse.y) * 0.06;
            pulse *= 0.94;

            gl.uniform1f(uTime, t);
            gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.uniform1f(uPulse, pulse);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const loop = (now: number) => {
            draw(now);
            raf = requestAnimationFrame(loop);
        };
        const play = () => {
            if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        resize();
        draw(performance.now());
        canvas.style.opacity = "1";

        const ro = new ResizeObserver(() => {
            resize();
            if (!raf) draw(performance.now());
        });
        ro.observe(canvas);

        // Only animate while the hero is on screen and the tab is visible.
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) play();
            else stop();
        });
        io.observe(canvas);
        const onVisibility = () => (document.hidden ? stop() : play());
        document.addEventListener("visibilitychange", onVisibility);

        const onLost = (e: Event) => {
            e.preventDefault();
            stop();
            canvas.style.opacity = "0";
        };
        canvas.addEventListener("webglcontextlost", onLost);

        if (!reduced) {
            window.addEventListener("pointermove", onMove, { passive: true });
            window.addEventListener("pointerdown", onDown, { passive: true });
        }
        play();

        return () => {
            stop();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            canvas.removeEventListener("webglcontextlost", onLost);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteBuffer(buf);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 ${className}`}
        />
    );
}

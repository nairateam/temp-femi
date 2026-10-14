import ReactMarkdown from "react-markdown";

const components = {
    p: ({ children }: React.ComponentProps<"p">) => (
        <p className="mb-3 last:mb-0">{children}</p>
    ),
    strong: ({ children }: React.ComponentProps<"strong">) => (
        <strong className="font-medium text-[#0d1b2a]/80">{children}</strong>
    ),
    em: ({ children }: React.ComponentProps<"em">) => (
        <em className="italic">{children}</em>
    ),
    ul: ({ children }: React.ComponentProps<"ul">) => (
        <ul className="list-disc pl-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }: React.ComponentProps<"ol">) => (
        <ol className="list-decimal pl-4 space-y-1">{children}</ol>
    ),
    li: ({ children }: React.ComponentProps<"li">) => (
        <li>{children}</li>
    ),
};

export default function MDContent({
    content,
    className,
}: {
    content: string | null
    className?: string;
}) {
    return (
        <div className={className}>
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
        </div>
    );
}
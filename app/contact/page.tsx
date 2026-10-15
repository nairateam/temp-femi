import type { Metadata } from "next";
import ContactPage from "./contact-client";

export const metadata: Metadata = {
    title: "Contact",
    description: "Have a project in mind? Get in touch to start a conversation.",
};

export default function Page() {
    return <ContactPage />;
}

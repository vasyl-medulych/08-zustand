import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

const title = "Create Note";
const description = "You can create a new note";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/action/create`,
    siteName: title,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

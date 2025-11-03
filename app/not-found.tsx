import { Metadata } from "next";
import css from "./page.module.css";

const title = "Page not found";
const description = "This is page not found, try refresh or go to main page";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/not-found",
    siteName: title,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

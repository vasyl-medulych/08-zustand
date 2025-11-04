import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const title = `Notes: ${slug[0]}`;
  const description = `Notes with tag: ${slug[0]}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes/filter/${slug[0]}`,
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
}

export default async function Notes({ params }: NotesProps) {
  const resolveParams = await params;
  const tag = resolveParams.slug?.[0];
  const queryClient = new QueryClient();
  const finalTag = tag === "all" ? undefined : tag;
  if (finalTag) {
    await queryClient.prefetchQuery({
      queryKey: ["notes", "", 1, finalTag],
      queryFn: () => fetchNotes("", 1, finalTag),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={finalTag} />
    </HydrationBoundary>
  );
}

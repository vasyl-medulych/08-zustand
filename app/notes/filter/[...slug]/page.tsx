import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
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

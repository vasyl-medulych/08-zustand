"use client";

import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NotePreview() {
  const { id: noteId } = useParams<{ id: string }>();
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClickBack}>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <h2 className={css.header}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>Tag: {note.tag}</p>
            <p className={css.date}>
              Created: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
          <button className={css.backBtn} onClick={handleClickBack}>
            Back
          </button>
        </div>
      )}
    </Modal>
  );
}

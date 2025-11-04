"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { ChangeEvent, useId } from "react";
import { createNote } from "@/lib/api";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (formData: FormData) => {
    const noteData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as
        | "Todo"
        | "Work"
        | "Personal"
        | "Meeting"
        | "Shopping",
    };
    if (!noteData.title || !noteData.content || !noteData.tag) {
      toast.error("All fields are required");
      return;
    }
    mutate(noteData);
  };

  const id = useId();
  return (
    <form className={css.form} action={handleSubmit}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          defaultValue={draft.title}
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          defaultValue={draft.content}
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          defaultValue={draft.tag}
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleBack}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Create..." : "Create note"}
        </button>
      </div>
    </form>
  );
}

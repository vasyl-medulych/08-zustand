import { create } from "zustand";
import { NewNote } from "../api";
import { persist } from "zustand/middleware";

interface NoteDraft {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteDraft>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (note: NewNote) => set({ draft: note }),
        clearDraft: () => set({ draft: initialDraft }),
      };
    },
    { name: "draft" }
  )
);

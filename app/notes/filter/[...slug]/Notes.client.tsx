"use client";
import css from "./Notes.client.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { useEffect, useState } from "react";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useDebounce } from "use-debounce";
import Link from "next/link";

interface NotesClientProp {
  tag?: string;
}

function NotesClient({ tag }: NotesClientProp) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data?.notes.length == 0) {
      toast.error("No notes found for your request.");
    }
  }, [data]);

  function handleSearch(query: string) {
    setQuery(query);
    setCurrentPage(1);
  }
  const totalPages = data?.totalPages ? data.totalPages : 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <Toaster position="top-center" reverseOrder={false} />
          <SearchBox onSearch={handleSearch} />
          {totalPages >= 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <Link href="/notes/action/create" className={css.button}>
            Create Note +
          </Link>
        </header>
      </div>
      {isLoading && <Loader />}
      {isError ? (
        <ErrorMessage />
      ) : (
        data &&
        data?.notes.length > 0 &&
        isLoading === false && <NoteList notes={data?.notes} />
      )}
    </>
  );
}

export default NotesClient;

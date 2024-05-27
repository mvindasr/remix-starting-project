import { Link, Params, json, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import { Note } from "~/interfaces/note";
import styles from "~/styles/note-details.css?url"

export default function NoteDetailsPage() {
  const note : Note = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({params} : {params : Params}) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note : Note) => note.id === noteId);

  if (!selectedNote) {
    throw json({message: "Could not find note for id "+noteId},
    { status: 404,
      statusText: "Note not found"
    }
    );
  }
  return selectedNote;
}

export function links() {
    return [{rel:'stylesheet', href: styles}]
}

export function meta({data} : {data: Note} ) {
  return [
    {
      title: data.title,
      description: "Manage your notes with ease.",
    },
  ];
}
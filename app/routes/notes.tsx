import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { Note } from "~/interfaces/note";

export default function NotesPage() {
  const notes: Note[] = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  //Generate response error
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  /*const noteData = {
        title: formData.get('title'),
        content: formData.get('content'),
    };*/
  // Object from entries convierte los htmlFor en atributos a noteData
  const noteData: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    noteData[key] = value.toString().trim(); // Ensure value is converted to string and then trimmed
  }

  // Add validation
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return [
    {
      title: "All Notes",
      description: "Manage your notes with ease.",
    },
  ];
}

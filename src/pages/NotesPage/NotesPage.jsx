import { useState } from "react";
import AddNote from "../../components/AddNote/AddNote";
import { useEffect } from "react";
import { index } from "../../utilities/notes-service";
import Note from "../../components/Note/Note";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const allNotes = notes.map((n) => <Note note={n} />);

  async function getNotes() {
    const getNote = await index();
    setNotes(getNote);
  }

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <h1>Add a Note</h1>
      <AddNote getNotes={getNotes} />
      <ul>{allNotes}</ul>
    </>
  );
}

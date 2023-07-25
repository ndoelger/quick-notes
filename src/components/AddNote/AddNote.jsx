import { useState } from "react";
import * as notesService from "../../utilities/notes-service";

export default function Notes({ getNotes }) {
  const [note, setNote] = useState({
    text: "",
  });

  const [error, setError] = useState("");

  function handleChange(evt) {
    setNote({ ...note, [evt.target.name]: evt.target.value });
    setError("");
  }

  // send to service file => route => controller => model
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await notesService.addNote(note);
      setNote({
        text: "",
      });
      getNotes();
    } catch {
      setError("Error");
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="text"
          value={note.text}
          onChange={handleChange}
          required
        />
        <button type="submit">ADD NOTE</button>
      </form>
      <p className="error-message">{error}</p>
    </div>
  );
}

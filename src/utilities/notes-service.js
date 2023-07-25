import * as notesAPI from "./notes-api";

export async function addNote(formData) {
  await notesAPI.addNote(formData);
}

export async function index() {
  const allNotes = await notesAPI.indexNote();
  return allNotes;
}

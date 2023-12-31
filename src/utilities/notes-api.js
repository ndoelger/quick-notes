import sendRequest from "./send-request";
const BASE_URL = "/api/notes";

export async function indexNote() {
  return sendRequest(BASE_URL);
}

export async function addNote(formData) {
  return sendRequest(`${BASE_URL}`, "POST", formData);
}

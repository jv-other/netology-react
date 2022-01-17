import React, { useState, useEffect } from "react";

import NotesAPI from "./api/NotesAPI";
import Note from "./components/Note/Note";
import NoteInput from "./components/NoteInput/NoteInput";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const NOTES_API_URL = "http://localhost:7777/notes";
const notesApi = new NotesAPI(NOTES_API_URL);

function App() {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loading && notesApi.list().then(items => {
      setLoading(false);
      setNotes(items);
    });
  }, [loading])

  const handleAdd = note => notesApi.add(note).then(() => setLoading(true));
  const handleRemove = noteId => notesApi.remove(noteId).then(() => setLoading(true));
  const handleRefresh = () => setLoading(true);

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>
          Notes
          <span
            className={`notes-refresh fa fa-sync-alt ${loading ? "fa-spin" : ""}`}
            onClick={handleRefresh}
          />
        </h1>
      </div>
      <div className="notes-list">
        {notes.map(note => (
          <Note key={note.id} {...note} onRemove={handleRemove} />
        ))}
      </div>
      <NoteInput onSubmit={handleAdd} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../network/api";
import styles from "../styles/NotesPage.module.css";
import stylesUtils from "../styles/utils.module.css";
import AddEditNote from "./AddEditNote";
import Note from "./Note";

const LogInNotePage = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesLoadingError, setNotesLoadingError] = useState(false);

  const [showAddNotes, setShowAddNotes] = useState(false);
  const [editNote, setEditNote] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);


  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid =
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map(note => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onNoteClick={setEditNote}
            onDelete={deleteNote} />
        </Col>
      ))}
    </Row>
  return (
    <>
      <Button className={`my-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`} onClick={() => setShowAddNotes(true)}>
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary' />}
      {notesLoadingError && <div>Error loading notes. Refresh the page to try again.</div>}
      {!notesLoading && !notesLoadingError &&
        <>
          {
            notes.length > 0
              ? notesGrid
              : <div className="text-center">No notes found</div>
          }
        </>
      }
      {showAddNotes &&
        <AddEditNote onDismiss={() => setShowAddNotes(false)} onNoteSaved={(newNote) => {
          setNotes([...notes, newNote]);
          setShowAddNotes(false);
        }} />
      }
      {editNote &&
        <AddEditNote
          noteToEdit={editNote}
          onDismiss={() => setEditNote(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
            setEditNote(null);
          }} />
      }
    </>
  );
}

export default LogInNotePage;
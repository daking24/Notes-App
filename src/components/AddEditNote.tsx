import { Button, Form, Modal } from "react-bootstrap"
import { Note } from "../models/note"
import { useForm } from "react-hook-form"
import { NoteInput } from "../network/api"
import * as NotesApi from "../network/api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteProps {
  noteToEdit?: Note,
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
}

function AddEditNote({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert("Error saving note");
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        { noteToEdit ? "Edit Note" : "Add Note" }
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Enter title"
            error={errors.title}
            register={register}
            registerOptions={{ required: "Required" }}
          />
          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Enter text"
            register={register}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting} variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditNote
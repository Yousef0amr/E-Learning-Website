import notification from "../utils/toastNotify";
import getErrorMessage from "../utils/validationResponseError";

const useNoteActions = (addNote, deleteNote, updateNote) => {
    const onSubmit = async (note) => {
        try {
            const newNote = await addNote(note).unwrap();
            if (newNote.error) {
                const message = getErrorMessage(newNote.error);
                throw new Error(message);
            }
            notification('success', newNote.message || 'Note added successfully');

        } catch (error) {
            notification('error', 'Failed to add note', error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const result = await deleteNote(id).unwrap();
            if (!result.data) {
                throw new Error('Failed to delete note');
            }
            notification('success', 'Note deleted successfully');

        } catch (error) {
            notification('error', 'Failed to delete note', error);
        }
    };

    const handleEditNote = async (note, id) => {
        note.note_id = id;
        try {
            const result = await updateNote(note).unwrap();
            if (result.error) {
                const message = getErrorMessage(result.error);
                throw new Error(message);
            }
            notification('success', result.message || 'Note updated successfully');

        } catch (error) {
            notification('error', 'Failed to edit note', error);
        }
    };

    return {
        onSubmit,
        handleDeleteNote,
        handleEditNote,
    };
}

export default useNoteActions;

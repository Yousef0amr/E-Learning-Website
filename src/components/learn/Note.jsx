import React from 'react'
import { Button, Container } from 'react-bootstrap'
import NoteForm from './NoteForm'
import { useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation, useGetAllNotesQuery } from '../../features/slices/lessonSlice';
import useNoteActions from '../../hooks/useNoteActions';
import NoteList from './NoteList';
import Loader from '../common/Loader';
import RefreshComponent from '../common/RefreshComponent';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import { useLocation } from 'react-router-dom';
const Note = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const lessonId = searchParams.get('lessonId');
    const { data, isLoading, isError, refetch } = useGetAllNotesQuery(lessonId);
    const [addNote, { isLoading: isAddSuccess }] = useAddNoteMutation();
    const [deleteNote, { isLoading: isDeleteSuccess }] = useDeleteNoteMutation();
    const [updateNote, { isLoading: isUpdateSuccess }] = useUpdateNoteMutation();
    const { t } = useTranslation();
    const { onSubmit, handleDeleteNote, handleEditNote } = useNoteActions(addNote, deleteNote, updateNote);



    if (!lessonId) {
        return (
            <p className='fs-5 text-center'>لا يو جد درس </p>
        );
    }
    return (
        <Container className='note-container'>
            <Button className='add-note' onClick={() => document.getElementById("collapseExample").classList.toggle("show")}  ><span>{t(AppStrings.add_note_on_lesson)}</span> <span>+</span> </Button>
            <div className='d-flex justify-content-center align-items-center w-100'>
                <div className='collapse form-collapse' id="collapseExample">
                    <NoteForm onSubmitClicked={onSubmit} isLoading={isAddSuccess} lessonId={lessonId} />
                </div>
            </div>
            {
                isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :
                        data && data?.data?.notes
                        && <NoteList notes={data?.data?.notes} isUpdateSuccess={isUpdateSuccess} isDeleteSuccess={isDeleteSuccess} handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote} />
            }
        </Container>
    )
}

export default Note

import React from 'react'
import { Stack } from 'react-bootstrap'
import NoteCard from './NoteCard'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'

const NoteList = ({ notes, isUpdateSuccess, isDeleteSuccess, handleDeleteNote, handleEditNote }) => {
    const { t } = useTranslation()
    return (
        <Stack gap={4} style={{ marginTop: '30px' }}>
            {
                notes.length > 0 ? notes.map((note, index) => <NoteCard key={note.note_id} isUpdateSuccess={isUpdateSuccess} isDeleteSuccess={isDeleteSuccess} note={note} index={index} onEdit={handleEditNote} onDelete={handleDeleteNote} />) :
                    <p className='text-center fs-5'> {t(AppStrings.no_notes)}   </p>

            }
        </Stack>

    )
}

export default NoteList

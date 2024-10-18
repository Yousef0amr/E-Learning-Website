import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalDialog from '../common/ModalDialog'
import NoteForm from './NoteForm'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'
const NoteCard = ({ note, ...props }) => {
    const [show, setShow] = useState(false);
    const { t } = useTranslation()

    useEffect(() => {
        if (props.isUpdateSuccess) {
            setShow(false)
        }
    }, [props.isUpdateSuccess])

    return (
        <div className='note'>
            <div className='note-header'>
                <div>
                    <span className='note-number'>
                        {props.index + 1}
                    </span>
                    <span className='note-title'>
                        {note.title}
                    </span>
                </div>
                <div>

                    <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => props.onDelete(note.note_id)}>
                        {
                            props.isDeleteSuccess ? <span style={{ color: 'var(--question-color-1)', fontSize: '20px' }}>{t(AppStrings.note_deleted_successfully)}</span> : <FontAwesomeIcon style={{ color: 'var(--question-color-1)', fontSize: '20px' }} icon={faTrash} />
                        }
                    </Button>
                    <Button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => setShow(true)}>
                        <FontAwesomeIcon style={{ color: 'GrayText', fontSize: '20px' }} icon={faEdit} />
                    </Button>
                </div>
            </div>
            <div className='note-body'>
                {note.content}
            </div>
            <ModalDialog open={show} onClose={() => setShow(false)} >
                <div className='note-modal'>
                    <NoteForm note={note} isEditNote={true} onSubmitClicked={props.onEdit} />
                </div>

            </ModalDialog>
        </div>
    )
}

export default NoteCard


import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';


const NoteForm = ({ onSubmitClicked, isLoading, isEditNote = false, note, lessonId }) => {
    const { t } = useTranslation()

    const defaultValues = isEditNote ? {
        title: note.title,
        content: note.content
    } : {
        title: '',
        content: ''
    };

    const schema = yup.object({
        title: yup.string().required(t(AppStrings.noteTitleRequired)),
        content: yup.string().required(t(AppStrings.noteContentRequired)),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    const onSubmit = (data) => {
        if (isEditNote) {
            onSubmitClicked(data, note.note_id);
        } else {
            data.lesson_id = lessonId;
            onSubmitClicked(data);
        }
        if (!isLoading) {
            setTimeout(() => {
                reset();
            }, 1500);
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className='note-form'>

                <input
                    label="Title"
                    className='note-title-input'
                    variant="outlined"
                    placeholder={t(AppStrings.noteTitlePlaceholder)}
                    fullWidth
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                />
                <textarea
                    label="Content"
                    placeholder={t(AppStrings.noteContentPlaceholder)}
                    className='note-content-input'
                    as="textarea"
                    variant="outlined"
                    fullWidth
                    {...register('content')}
                    error={!!errors.content}
                    helperText={errors.content ? errors.content.message : ''}
                />
                <button className='btn text-white' style={{ backgroundColor: 'var(--primary-color)' }} type="submit">{isLoading ? <SpinnerLoader /> : t(AppStrings.save_note)}</button>
            </form>
        </>
    )
}

export default NoteForm

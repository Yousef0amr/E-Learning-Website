import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';
import { FormControl } from 'react-bootstrap';
import { io } from "socket.io-client"
import { BASEURL } from '../../api/endpoints';
const QuestionForm = ({ onSubmitClicked, isLoading, isEditQuestion, userQuestion, lessonId }) => {
    const { t } = useTranslation()

    const defaultValues = isEditQuestion ? {
        question: userQuestion.question,
    } : {
        question: '',
    };


    const schema = yup.object({
        question: yup.string().required(t(AppStrings.questionRequired)),
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
        if (isEditQuestion) {
            // onSubmitClicked(data, userQuestion.question_id);
        } else {
            onSubmitClicked(data);
            reset();
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center w-100   gap-3'>
            <FormControl
                label="Question"
                placeholder={t(AppStrings.questionPlaceholder)}
                {...register('question')}
            />
            <button className='btn text-white' style={{ backgroundColor: 'var(--primary-color)' }} type="submit">{isLoading ? <SpinnerLoader /> : t(AppStrings.send)}</button>
        </form>
    )
}

export default QuestionForm

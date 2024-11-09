import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
import SpinnerLoader from '../common/Spinner';
import { Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AnswerForm = ({ onSubmitClicked, isLoading, isEditAnswer, userAnswer, lessonId }) => {
    const { t } = useTranslation()

    const defaultValues = isEditAnswer ? {
        answer: userAnswer.answer,
    } : {
        answer: '',
    };


    const schema = yup.object({
        answer: yup.string().required(t(AppStrings.questionRequired)),
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
        if (isEditAnswer) {
            // onSubmitClicked(data, userQuestion.question_id);
        } else {
            onSubmitClicked(data);
            reset();
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='comment-form d-flex justify-content-center w-100   gap-3'>
            <div className="text-box mt-3" >
                <textarea placeholder="قم بالرد على هذا السؤال" {...register("answer")} ></textarea>
                <Button type="submit" className="send" >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </div>
        </form>
    )
}

export default AnswerForm

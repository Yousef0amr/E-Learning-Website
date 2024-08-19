import React from 'react'
import Form from 'react-bootstrap/Form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faAt, faCircleExclamation, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../features/slices/authSlice';
import { useAuth } from './../../utils/auth';
import { toast } from 'react-toastify';

const schema = yup.object({
    userName: yup.string().min(6, "  يجب ان يكون الاسم اكبر من 8 احرف").required("اسم المستخدم مطلوب"),
    phone: yup.string().min(10, "ادخل رقم هاتف صحيح").max(11,).required("رقم الهاتف مطلوب"),
    email: yup.string().email("قم بأدخال بريد الكتروني صحيح").required("البريد الالكتروني مطلوب"),
    password: yup.string().min(8, "كلمة المرور يجب ان تكون اكبر من 8 احرف").required("كلمة المرور مطلوبة")
}).required();
const SignUpForm = () => {
    const navigate = useNavigate();
    const [signUp, { isLoading }] = useSignUpMutation()
    const { loginLocal } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (user) => {
        try {
            const { data } = await signUp(user).unwrap()

            if (data.accessToken) {
                loginLocal(data.accessToken);
                toast.success('تم تسجيل الدخول بنجاح');
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 2000);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.data.message);
        }

    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-filed'>
                <input
                    placeholder='الاسم'
                    {...register('userName')}
                />
                <FontAwesomeIcon icon={faUser} className='icon-filed' />
            </div >
            {errors.userName && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.userName.message}</div>}
            <div className='input-filed'>
                <input
                    placeholder='رقم الهاتف'
                    {...register('phone')}
                />
                <FontAwesomeIcon icon={faPhone} className='icon-filed' />
            </div >
            {errors.phone && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.phone.message}</div>}
            <div className='input-filed'>
                <input
                    placeholder='البريد الالكتروني'
                    {...register('email')}
                />
                <FontAwesomeIcon icon={faAt} className='icon-filed' />
            </div >
            {errors.email && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.email.message}</div>}
            <div className='input-filed'>
                <input
                    placeholder='كلمة المرور'
                    type='password'
                    {...register('password')}
                />
                <FontAwesomeIcon icon={faHashtag} className='icon-filed' />
            </div>
            {errors.password && <div className='error-message'><FontAwesomeIcon icon={faCircleExclamation} /> {errors.password.message}</div>}
            <Button type="submit" className='submit-button' disabled={isLoading}> {isLoading ? ` ...${'!'}  أنشئ الحساب` : ` ${'!'}  أنشئ الحساب`}</Button>

            <div className='no-account mt-3 d-flex flex-row-reverse'>
                <p>يوجد لديك حساب بالفعل؟</p>

                <Link to={'/login'}> <span>
                    ادخل إلى حسابك الآن
                </span></Link>

            </div>

        </Form>
    )
}

export default SignUpForm

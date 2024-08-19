import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faAt, faRightFromBracket, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from './../../features/slices/authSlice';
import { toast } from 'react-toastify';
import { useAuth } from './../../utils/auth';

const schema = yup.object({
    email: yup.string().email("قم بأدخال بريد الكتروني صحيح").required("البريد الالكتروني مطلوب"),
    password: yup.string().min(8, "كلمة المرور يجب ان تكون اكبر من 8 احرف").required("كلمة المرور مطلوبة")
}).required();

const LoginForm = () => {

    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { loginLocal } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (user) => {
        const newUser = {
            email: user.email,
            password: user.password,
        };

        try {
            const { data } = await login(newUser).unwrap();

            if (data.accessToken) {
                loginLocal(data.accessToken);
                toast.success('تم تسجيل الدخول بنجاح');
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 2000);
            }
        } catch (err) {
            toast.error(err.data.message);
        }
    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-filed'>
                <input
                    placeholder='البريد الالكتروني'
                    {...register('email')}
                />
                <FontAwesomeIcon icon={faAt} className='icon-filed' />
            </div>
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

            <Button type="submit" className='submit-button'>
                <FontAwesomeIcon icon={faRightFromBracket} disabled={isLoading} />
                {isLoading ? 'تسجيل الدخول ....' : 'تسجيل الدخول'}
            </Button>
            <div className='mt-3  d-flex flex-row-reverse '>
                <p>   هل نسيت كلمة السر؟  </p>
                <Link to={'/sign-up'}  ><i className="fa fa-underline" aria-hidden="true">
                    اضغط هنا
                </i>
                </Link>
            </div>
            <div className='no-account mt-2 d-flex flex-row-reverse'>
                <p>لا يوجد لديك حساب؟</p>
                <Link to={'/sign-up'}><span>{'!'}انشئ حسابك الأن</span></Link>

            </div>


        </Form>
    )
}

export default LoginForm

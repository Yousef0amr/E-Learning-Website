import React from 'react'

const AuthLayout = ({ title, background, children }) => {
    return (
        <div className='login'>
            <div className='login-form'>
                <div className='title'>
                    <span>{title} </span>
                </div>
                {
                    children
                }
            </div>
            <div className='bg-login'>
                <img src={background} alt='background' />
            </div>
        </div>
    )
}

export default AuthLayout

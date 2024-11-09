import React from 'react'

const CommentCard = ({ question }) => {


    return (

        <div className="comments">
            <div className="comment-container">
                <div className="user">
                    <div className="user-pic">
                        {question?.user?.userName.substring(0, 1).toUpperCase() || question?.username.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span>{question?.user?.userName || question.username}</span>
                        <p className='comment-date'>{question?.createdAt ? new Date(question?.createdAt).toLocaleDateString('ar-EG', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        }) : new Date().toLocaleDateString('ar-EG', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                        <p className="comment-content">
                            {question?.question || question?.answer}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard

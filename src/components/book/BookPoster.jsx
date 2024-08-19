import React from 'react'
import bookPoster from './../../assets/book.jpg'
import SectionTitle from '../common/SectionTitle'

const BookPoster = () => {
    return (
        <>
            <SectionTitle title="كتاب الغالي" />
            <div className='book-poster' style={{ position: 'relative', borderRadius: '20px', padding: '5px' }} >
                <div className='book-image' data-content="يمكنك الحصول على كتابك يا غالي من خلال التواصل معنا عبر ">
                    <img src={bookPoster} alt="book" style={{ width: '100%', borderRadius: '20px' }} />
                </div>
            </div>
        </>

    )
}

export default BookPoster
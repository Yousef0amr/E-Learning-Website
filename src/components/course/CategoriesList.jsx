import React from 'react'
import CoursesList from './CoursesList'
import { Row } from 'react-bootstrap'

const CategoriesList = ({ categories }) => {
    return (
        categories.length > 0 ? categories.map((category) => {
            return category.courses && category.courses.length > 0 ? (
                <Row className='category' key={category.category_id}>
                    <h3 className='main-title'>{category.name}</h3>
                    <CoursesList courses={category.courses} />
                </Row>
            ) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh', fontSize: '30px' }}>
                    لايوجد كورسات في هذه الفئة
                </div>
        }
        )
            : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh', fontSize: '30px' }}>
                لايوجد كورسات في هذه الفئة
            </div>
    )
}

export default CategoriesList

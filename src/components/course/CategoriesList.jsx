import React from 'react';
import CoursesList from './CoursesList';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';

const CategoriesList = ({ categories }) => {
    console.log(categories)
    const { t } = useTranslation()
    return (
        categories.length > 0 ? categories.map((category) => {
            return category.courses.length > 0 ? (
                <Row className='category' key={category.category_id}>
                    <h3 className='main-title'>{category.name}</h3>
                    <CoursesList courses={category.courses} />
                </Row>
            ) : <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20vh', marginBottom: '50px', fontSize: '20px' }}>
                <h3 className='main-title'>{category.name}</h3>
                {t(AppStrings.no_courses_in_this_category)}
            </div>;
        }
        )
            : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh', fontSize: '30px' }}>
                {t(AppStrings.no_courses_in_this_category)}
            </div>
    );
};

export default CategoriesList;

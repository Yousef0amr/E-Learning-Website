import React from 'react'
import PlayListContent from './PlayListContent'
import { useTranslation } from 'react-i18next'
import AppStrings from '../../utils/appStrings'

const PlayList = ({ sections, activeIndex, handleOnItemClick }) => {
    const { t } = useTranslation();


    return (
        <div className='play-list play-list-collapse'>
            <div className='play-list-header'>
                <span> {t(AppStrings.course_content)}</span>
            </div>
            <PlayListContent sections={sections} activeIndex={activeIndex} handleOnItemClick={handleOnItemClick} />
        </div>
    );
};

export default PlayList;

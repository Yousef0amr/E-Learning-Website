import * as React from 'react';
import Container from 'react-bootstrap/Container';
import './../../styles/levels.css'
import { useGetLevelsQuery } from '../../features/slices/levelSlice';
import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import LevelsList from './LevelsList';
import RefreshComponent from '../common/RefreshComponent';
import { useTranslation } from 'react-i18next';
import AppStrings from '../../utils/appStrings';
export default function Levels() {
    const { data, isLoading, isError, refetch } = useGetLevelsQuery()
    const { t } = useTranslation()
    return (
        <Container >
            <SectionTitle title={t(AppStrings.levels)} />
            {
                isLoading ? <Loader /> :
                    (
                        isError ? <RefreshComponent refetch={refetch} /> :
                            data && data?.data?.levels && data?.data?.levels?.length > 0 ? (
                                <div className='level'>
                                    <LevelsList levels={data?.data?.levels} />
                                </div>
                            ) : <div className='text-center fs-3 mb-5'>
                                {t(AppStrings.no_levels_found)}
                            </div>
                    )
            }
        </Container>
    );
}

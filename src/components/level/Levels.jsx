import * as React from 'react';
import Container from 'react-bootstrap/Container';
import './../../styles/levels.css'
import { useGetLevelsQuery } from '../../features/slices/levelSlice';
import Loader from '../common/Loader';
import SectionTitle from '../common/SectionTitle';
import LevelsList from './LevelsList';
import RefreshComponent from '../common/RefreshComponent';
export default function Levels() {
    const { data, isLoading, isError, refetch } = useGetLevelsQuery()

    return (
        <Container >
            <SectionTitle title="السنوات الدراسية" />
            {
                isLoading ? <Loader /> :
                    (
                        isError ? <RefreshComponent refetch={refetch} /> :
                            data && (
                                <div className='level'>
                                    <LevelsList levels={data?.data.levels} />
                                </div>
                            )
                    )
            }
        </Container>
    );
}

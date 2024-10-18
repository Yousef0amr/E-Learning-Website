import React from 'react'
import { useGetLevelQuery } from '../features/slices/levelSlice'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Loader from '../components/common/Loader'
import RefreshComponent from '../components/common/RefreshComponent'
import CategoriesList from '../components/course/CategoriesList'
import './../styles/courses.css'
import { Header } from '../components/header/Header'
import SectionTitle from '../components/common/SectionTitle'
import { Footer } from '../components/common/Footer'
import { useTranslation } from 'react-i18next'
import AppStrings from '../utils/appStrings'

export const Course = () => {
    const { id } = useParams()

    const { data, isLoading, isError, refetch } = useGetLevelQuery(id)

    const { t } = useTranslation()
    return (
        <>
            <Container >
                <Header />
                {isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :
                        data && data?.data?.level && <>
                            <SectionTitle title={t(AppStrings.courses) + " " + data.data.level.name} />
                            <CategoriesList categories={data.data.level.categories} />
                        </>
                }

            </Container>
            <Footer />
        </>

    )
}

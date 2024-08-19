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

export const Course = () => {
    const { id } = useParams()

    const { data, isLoading, isError, refetch } = useGetLevelQuery(id)

    console.log(data)
    return (
        <>
            <Container >
                <Header />
                {isLoading ? <Loader /> :
                    isError ? <RefreshComponent refetch={refetch} /> :
                        data && data?.data?.level && <>
                            <SectionTitle title={" كورسات " + data.data.level.name} />
                            <CategoriesList categories={data.data.level.categories} />
                        </>
                }

            </Container>
            <Footer />
        </>

    )
}

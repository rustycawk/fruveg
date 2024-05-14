import React from 'react'
import CatalogContainer from '../catalog/CatalogContainer'
import { Container } from 'react-bootstrap'

type Props = {}

const Catalog = (props: Props) => {
    return <section className='home-catalog'>
        <Container>
            <h2 className='text-center'>Самые <span>популярные</span></h2>
            <p className='text-center'>Фруты и овощи на каждый день</p>
            <CatalogContainer type='popular' />
        </Container>
    </section>
}

export default Catalog
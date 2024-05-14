import React from 'react'
import { Container } from 'react-bootstrap'
import APP_CONFIG from '../../app.config'

type Props = {}

const Banner = (props: Props) => {


    return (
        <section className='home-banner'>
            <img className='home-banner-bg' src={APP_CONFIG.HOME_INDEX_BANNER} alt="" />
            <div className="home-banner-info">
                <Container>
                    <img src={APP_CONFIG.LOGO} width={200}  alt="" />
                    <h1>FruVeg</h1>
                    <h3>Свежие продукты в каждый дом!</h3>
                </Container>
            </div>
        </section>
    )
}

export default Banner
import React from 'react'
import { Container } from 'react-bootstrap'
import APP_CONFIG from '../../app.config'
import CatalogContainer from './CatalogContainer'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
     <div className="title-banner">
        <img src={APP_CONFIG.CATALOG_BANNER} alt="" />
        <div className="title-banner-content">
        <Container><h2>Каталог</h2></Container>
        </div>
      </div>
      <Container>
        <CatalogContainer type='all'/>
      </Container>
    </>
  )
}

export default Page
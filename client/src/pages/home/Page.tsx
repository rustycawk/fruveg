import React from 'react'
import Banner from './Banner'
import Catalog from './Catalog'

type Props = {}

const Page = (props: Props) => {
  return <div className='home'>
    <Banner/>
    <Catalog/>
  </div>
}

export default Page
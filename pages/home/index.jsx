import About from '@/components/About'
import Campaigns from '@/components/Campaigns'
import Carousel from '@/components/Carousel'
import Customers from '@/components/customer/Customers'
import Reservation from '@/components/Reservation'
import MenuWrapper from '@/components/product/MenuWrapper'
import React from 'react'
import axios from 'axios'

const Index = ({categoryList, productList}) => {
  return (
    <React.Fragment>
      <Carousel />
      <Campaigns />
      <MenuWrapper categoryList={categoryList} productList={productList}/>
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  )
}


export default Index
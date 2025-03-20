import React from 'react'
import { TopicBar } from '../../componants/TopicBar'
import OrderTable from '../../componants/Order Management/OrderTable/OrderTable'
import OrdersCountBoxes from '../../componants/Order Management/OrdersCountBoxes/OrdersCountBoxes'
import { Container } from '@mui/material'
import OrderProgress from '../../componants/Order Management/OrderProgress/OrderProgress'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order_Mainpage.css'


function Order_Mainpage() {
  return (
    <>
        <TopicBar text="Order Management" userName="Vishwa Dissanayake" />
        <OrdersCountBoxes/>

        <Container className='main-container'>
          <OrderTable className='Orders'/>
          <OrderProgress className='OrderProgress'/>

        </Container>
        
    </>
  )
}

export default Order_Mainpage
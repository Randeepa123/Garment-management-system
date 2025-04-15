import React, { useEffect } from 'react'
import { TopicBar } from '../../componants/TopicBar'
import OrderTable from '../../componants/Order Management/OrderTable/OrderTable'
import OrdersCountBoxes from '../../componants/Order Management/OrdersCountBoxes/OrdersCountBoxes'
import { Container } from '@mui/material'
import OrderProgress from '../../componants/Order Management/OrderProgress/OrderProgress'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order_Mainpage.css'
import axios from 'axios'


function Order_Mainpage() {

  const [orders, setOrders] = React.useState([]);
  

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    axios.get('http://localhost:8070/orders')
    .then((response) => {
      setOrders(response.data);
    })
    .catch=(err)=> {
      console.log(err)
    } 
  }

  
  

  return (
    <>
        <TopicBar text="Order Management" userName="Vishwa Dissanayake" />
        <OrdersCountBoxes/>

        <Container className='main-container'>
          <OrderTable 
            rows={orders} 
            getOrders={getOrders}
          />
          <OrderProgress className='OrderProgress'/>
        </Container>
        
    </>
  )
}

export default Order_Mainpage
import React, { useEffect } from 'react'
import { TopicBar } from '../../componants/TopicBar'
import axios from 'axios'
import UpdateJobCard from '../../componants/Order Management/Jobcard/UpdateJobCard'
import { useLocation } from 'react-router-dom';


function UpdateOrder() {

  const location = useLocation();
  const {Id} = location.state || {};
  const {orderdate} = location.state || {};
  const {deliverydate} = location.state || {};
  const {customer} = location.state || {};

  console.log("Id in updateOrder:",Id);

  const updateorder = (data) => {
    const payload = {
      id: Id,
      orderdate: data.orderdate ,
      deliverydate: data.deliverydate ,
      customer: data.customer,
    }
    axios.post('http://localhost:3001/updateorder', payload)
    .then((response) => {
      console.log(response);
    })
    .catch=(err)=> {
      console.log(err)
    }
  }

  return (
    <>
        <div>
        <TopicBar text="Add Orders" userName="Vishwa Dissanayake"/>
        <UpdateJobCard id={Id} submitted={false} orderdate={orderdate} deliverydate={deliverydate} customer={customer} />
        </div> 
        
    </>
  )
  }

export default UpdateOrder
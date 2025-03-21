import React, { useEffect } from 'react'
import { TopicBar } from '../../componants/TopicBar'
import axios from 'axios'
import JobCard from '../../componants/Order Management/Jobcard/JobCard'

function AddOrder() {
  const [submitted, setSubmitted] = React.useState(false);

  const addorder = (data) => {
    setSubmitted(true);

    const payload = {
      orderdate: data.orderdate ,
      deliverydate: data.deliverydate ,
      customer: data.customer,
    }
    axios.post('http://localhost:3001/addorder', payload)
    .then((response) => {
      setSubmitted(false);
    })
    .catch=(err)=> {
      console.log(err)
    } 
  }

  return (
    <>
        <div>
        <TopicBar text="Add Orders" userName="Vishwa Dissanayake"/>
        <JobCard addOrder={addorder} submitted={submitted}/>
        </div> 
        
    </>
  )
}

export default AddOrder
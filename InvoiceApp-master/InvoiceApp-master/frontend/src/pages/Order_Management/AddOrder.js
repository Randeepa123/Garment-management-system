import React from 'react'
import { TopicBar } from '../../componants/TopicBar'
import JobCard from '../../componants/Order Management/Jobcard/JobCard'

function AddOrder() {
  return (
    <>
        <div>
        <TopicBar text="Add Orders" userName="Vishwa Dissanayake"/>
        <JobCard/>
        </div> 
        
    </>
  )
}

export default AddOrder
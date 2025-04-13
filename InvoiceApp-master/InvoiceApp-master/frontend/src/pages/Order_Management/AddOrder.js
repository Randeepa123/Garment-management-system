import React, { useEffect } from 'react'
import { TopicBar } from '../../componants/TopicBar'
import axios from 'axios'
import JobCard from '../../componants/Order Management/Jobcard/JobCard'

function AddOrder() {
  const [submitted, setSubmitted] = React.useState(false);

  const addorder = (data) => {
    setSubmitted(true);
    console.log(data.orderDate)
    console.log(data.deliveryDate)
    const payload = {
      
      orderDate: data.orderDate,  
      deliveryDate: data.deliveryDate,  
      customer: data.customer,
      priority: data.priority,
      styleNumber: data.styleNumber,
      description: data.description,
      fabricDetails: data.fabricDetails,
      color: data.color,
      wait:data.wait,
      sizeRange: data.sizeRange,
      sizeDistribution: {
        sizeDistributionS: data.sizeDistribution.S,
        sizeDistributionM: data.sizeDistribution.M,
        sizeDistributionL: data.sizeDistribution.L,
        sizeDistributionXL: data.sizeDistribution.XL,
        sizeDistribution2XL: data.sizeDistribution["2XL"],
        sizeDistribution3XL: data.sizeDistribution["3XL"]
      },
      measurementNotes: data.measurementNotes,
      frontDesign: {
        imageUrl: data.frontDesign.imageUrl,
        notes: data.frontDesign.notes
      },
      backDesign: {
        imageUrl: data.backDesign.imageUrl,
        notes: data.backDesign.notes
      },
      productionTracking: {
        patternMaking: {
          startDate: data.productionTracking.patternMaking.startDate,
          endDate: data.productionTracking.patternMaking.endDate,
          supervisor: data.productionTracking.patternMaking.supervisor,
          status: data.productionTracking.patternMaking.status
        },
        cutting: {
          startDate: data.productionTracking.cutting.startDate,
          endDate: data.productionTracking.cutting.endDate,
          supervisor: data.productionTracking.cutting.supervisor,
          status: data.productionTracking.cutting.status
        },
        printing: {
          startDate: data.productionTracking.printing.startDate,
          endDate: data.productionTracking.printing.endDate,
          supervisor: data.productionTracking.printing.supervisor,
          status: data.productionTracking.printing.status
        },
        sewing: {
          startDate: data.productionTracking.sewing.startDate,
          endDate: data.productionTracking.sewing.endDate,
          supervisor: data.productionTracking.sewing.supervisor,
          status: data.productionTracking.sewing.status
        },
        finishing: {
          startDate: data.productionTracking.finishing.startDate,
          endDate: data.productionTracking.finishing.endDate,
          supervisor: data.productionTracking.finishing.supervisor,
          status: data.productionTracking.finishing.status
        },
        qualityControl: {
          startDate: data.productionTracking.qualityControl.startDate,
          endDate: data.productionTracking.qualityControl.endDate,
          supervisor: data.productionTracking.qualityControl.supervisor,
          status: data.productionTracking.qualityControl.status,
          checks: {
            measurementsCorrect: data.productionTracking.qualityControl.checks.measurementsCorrect,
            stitchingQuality: data.productionTracking.qualityControl.checks.stitchingQuality,
            colorMatching: data.productionTracking.qualityControl.checks.colorMatching,
            fabricQuality: data.productionTracking.qualityControl.checks.fabricQuality,
            printQuality: data.productionTracking.qualityControl.checks.printQuality,
            washTest: data.productionTracking.qualityControl.checks.washTest,
            finishing: data.productionTracking.qualityControl.checks.finishing,
            labelsAndTags: data.productionTracking.qualityControl.checks.labelsAndTags,
            notes: data.productionTracking.qualityControl.checks.notes
          }
        },
        packaging: {
          startDate: data.productionTracking.packaging.startDate,
          endDate: data.productionTracking.packaging.endDate,
          supervisor: data.productionTracking.packaging.supervisor,
          status: data.productionTracking.packaging.status
        }
      }
    }
    return axios.post('http://localhost:8070/addorder', payload)
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
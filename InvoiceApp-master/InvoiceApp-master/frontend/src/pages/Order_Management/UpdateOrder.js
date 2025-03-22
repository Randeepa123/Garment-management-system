import React, { use, useEffect, useState } from 'react'
import { TopicBar } from '../../componants/TopicBar'
import axios from 'axios'
import UpdateJobCard from '../../componants/Order Management/Jobcard/UpdateJobCard'
import { data, useLocation } from 'react-router-dom';


function UpdateOrder() {
  

  const location = useLocation();
  const {Id} = location.state || {};
  const [order,setOrder]=useState([]);
  
          useEffect(() => {
              getOrderbyId(Id);
              }, [])
          
            const getOrderbyId =(Id) => {
              const payload={jobcardId:Id}
          
              axios.post('http://localhost:3001/findOrderById',payload)
              .then((response) => {
                setOrder(response.data);
                console.log("data is:",response.data);
              })
              .catch((err)=> {
                console.log(err)
              } )
            }

  const [updated, setUpdated] = React.useState(false);

  console.log("Id in updateOrder:",Id);
  console.log("data in updateOrder:",order);
  console.log("data in updateOrder:",order.customer);

  const updateorder = (data) => {
    setUpdated(true);
    console.log(data);
    const payload = {
      jobcardId: Id,
      orderDate: data.orderdate,  
      deliveryDate: data.deliverydate,  
      customer: data.customer,
      priority: data.priority,
      styleNumber: data.styleNumber,
      description: data.description,
      fabricDetails: data.fabricDetails,
      color: data.color,
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
    return axios.post('http://localhost:3001/updateorder', payload)
    .then((response) => {
      setUpdated(false);
      return true;
    })
    .catch=(err)=> {
      console.log(err)
    }
  }

  

  return (
    <>
        
        <TopicBar text="Add Orders" userName="Vishwa Dissanayake"/>
        <UpdateJobCard 
          updateorder={updateorder} 
          updated={updated} 
          Id={Id}
          customer={order.customer}
          orderdate={order.orderDate || ''}
          deliverydate={order.deliveryDate || ''}
          priority={order.priority }
          styleNumber={order.styleNumber || ''}
          totalQuantity={order.totalQuantity || 0}
          description={order.description || ''}
          fabricDetails={order.fabricDetails || ''}
          color={order.color || ''}
          sizeRange={order.sizeRange || ''}
          
          // Size distribution (nested object in API response)
          sizeDistributionS={order.sizeDistribution?.sizeDistributionS || 0}
          sizeDistributionM={order.sizeDistribution?.sizeDistributionM || 0}
          sizeDistributionL={order.sizeDistribution?.sizeDistributionL || 0}
          sizeDistributionXL={order.sizeDistribution?.sizeDistributionXL || 0}
          sizeDistribution2XL={order.sizeDistribution?.sizeDistribution2XL || 0}
          sizeDistribution3XL={order.sizeDistribution?.sizeDistribution3XL || 0}
          
          // Measurement notes
          measurementNotes={order.measurementNotes || ''}
          
          // Design details (nested objects in API response)
          frontDesignImageUrl={order.frontDesign?.imageUrl || ''}
          frontDesignNotes={order.frontDesign?.notes || ''}
          backDesignImageUrl={order.backDesign?.imageUrl || ''}
          backDesignNotes={order.backDesign?.notes || ''}
          
          // Production tracking - Pattern Making (nested object)
          patternMakingStartDate={order.productionTracking?.patternMaking?.startDate || ''}
          patternMakingEndDate={order.productionTracking?.patternMaking?.endDate || ''}
          patternMakingSupervisor={order.productionTracking?.patternMaking?.supervisor || ''}
          patternMakingStatus={order.productionTracking?.patternMaking?.status || 'Pending'}
          
          // Production tracking - Cutting (nested object)
          cuttingStartDate={order.productionTracking?.cutting?.startDate || ''}
          cuttingEndDate={order.productionTracking?.cutting?.endDate || ''}
          cuttingSupervisor={order.productionTracking?.cutting?.supervisor || ''}
          cuttingStatus={order.productionTracking?.cutting?.status || 'Pending'}
          
          // Production tracking - Printing (nested object)
          printingStartDate={order.productionTracking?.printing?.startDate || ''}
          printingEndDate={order.productionTracking?.printing?.endDate || ''}
          printingSupervisor={order.productionTracking?.printing?.supervisor || ''}
          printingStatus={order.productionTracking?.printing?.status || 'Pending'}
          
          // Production tracking - Sewing (nested object)
          sewingStartDate={order.productionTracking?.sewing?.startDate || ''}
          sewingEndDate={order.productionTracking?.sewing?.endDate || ''}
          sewingSupervisor={order.productionTracking?.sewing?.supervisor || ''}
          sewingStatus={order.productionTracking?.sewing?.status || 'Pending'}
          
          // Production tracking - Finishing (nested object)
          finishingStartDate={order.productionTracking?.finishing?.startDate || ''}
          finishingEndDate={order.productionTracking?.finishing?.endDate || ''}
          finishingSupervisor={order.productionTracking?.finishing?.supervisor || ''}
          finishingStatus={order.productionTracking?.finishing?.status || 'Pending'}
          
          // Production tracking - Quality Control (nested object)
          qualityControlStartDate={order.productionTracking?.qualityControl?.startDate || ''}
          qualityControlEndDate={order.productionTracking?.qualityControl?.endDate || ''}
          qualityControlSupervisor={order.productionTracking?.qualityControl?.supervisor || ''}
          qualityControlStatus={order.productionTracking?.qualityControl?.status || 'Pending'}
          
          // Production tracking - Packaging (nested object)
          packagingStartDate={order.productionTracking?.packaging?.startDate || ''}
          packagingEndDate={order.productionTracking?.packaging?.endDate || ''}
          packagingSupervisor={order.productionTracking?.packaging?.supervisor || ''}
          packagingStatus={order.productionTracking?.packaging?.status || 'Pending'}
          
          // Quality Control Checks (deeply nested object)
          qcMeasurementsCorrect={order.productionTracking?.qualityControl?.checks?.measurementsCorrect || false}
          qcStitchingQuality={order.productionTracking?.qualityControl?.checks?.stitchingQuality || false}
          qcColorMatching={order.productionTracking?.qualityControl?.checks?.colorMatching || false}
          qcFabricQuality={order.productionTracking?.qualityControl?.checks?.fabricQuality || false}
          qcPrintQuality={order.productionTracking?.qualityControl?.checks?.printQuality || false}
          qcWashTest={order.productionTracking?.qualityControl?.checks?.washTest || false}
          qcFinishing={order.productionTracking?.qualityControl?.checks?.finishing || false}
          qcLabelsAndTags={order.productionTracking?.qualityControl?.checks?.labelsAndTags || false}
          qcNotes={order.productionTracking?.qualityControl?.checks?.notes || ''}/>
        
        
    </>
  )
  }

export default UpdateOrder
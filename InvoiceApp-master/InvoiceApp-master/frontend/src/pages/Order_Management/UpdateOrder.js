import React, { useEffect } from 'react'
import { TopicBar } from '../../componants/TopicBar'
import axios from 'axios'
import UpdateJobCard from '../../componants/Order Management/Jobcard/UpdateJobCard'
import { data, useLocation } from 'react-router-dom';


function UpdateOrder() {
  

  const location = useLocation();
  const {Id} = location.state || {};
  const {orderdate} = location.state || {};
  const {deliverydate} = location.state || {};
  const {customer} = location.state || {};
  const {priority} = location.state || {};
  const {styleNumber} = location.state || {};
  const {totalQuantity} = location.state || {};
  const {description} = location.state || {};
  const {fabricDetails} = location.state || {};
  const {color} = location.state || {};
  const {sizeRange} = location.state || {};

  const {sizeDistributionS} = location.state || {};
  const {sizeDistributionM} = location.state || {};
  const {sizeDistributionL} = location.state || {};
  const {sizeDistributionXL} = location.state || {};
  const {sizeDistribution2XL} = location.state || {};
  const {sizeDistribution3XL} = location.state || {};

  const {frontDesignImageUrl}=location.state||{};
  const {frontDesignNotes}=location.state||{};
  const {backDesignImageUrl}=location.state||{};
  const {backDesignNotes}=location.state||{};
  const {patternMakingStartDate}=location.state||{};
  const {patternMakingEndDate}=location.state||{};
  const {patternMakingSupervisor}=location.state||{};
  const {patternMakingStatus}=location.state||{};
  const {cuttingStartDate}=location.state||{};
  const {cuttingEndDate}=location.state||{};
  const {cuttingSupervisor}=location.state||{};

  const {measurementNotes}=location.state || {};

  const {cuttingStatus} = location.state || {};

  const {printingStartDate} = location.state || {};
  const {printingEndDate} = location.state || {};
  const {printingSupervisor} = location.state || {};
  const {printingStatus} = location.state || {};

  const {sewingStartDate} = location.state || {};
  const {sewingEndDate} = location.state || {};
  const {sewingSupervisor} = location.state || {};
  const {sewingStatus} = location.state || {};

  const {finishingStartDate} = location.state || {};
  const {finishingEndDate} = location.state || {};
  const {finishingSupervisor} = location.state || {};
  const {finishingStatus} = location.state || {};

  const {qualityControlStartDate} = location.state || {};
  const {qualityControlEndDate} = location.state || {};
  const {qualityControlSupervisor} = location.state || {};
  const {qualityControlStatus} = location.state || {};

  const {packagingStartDate} = location.state || {};
  const {packagingEndDate} = location.state || {};
  const {packagingSupervisor} = location.state || {};
  const {packagingStatus} = location.state || {};
  const {qcMeasurementsCorrect} = location.state || {};
  const {qcStitchingQuality} = location.state || {};
  const {qcColorMatching} = location.state || {};
  const {qcFabricQuality} = location.state || {};
  const {qcPrintQuality} = location.state || {};
  const {qcWashTest} = location.state || {};
  const {qcFinishing} = location.state || {};
  const {qcLabelsAndTags} = location.state || {};

  const {qcNotes} = location.state || {};

  const [updated, setUpdated] = React.useState(false);

  console.log("Id in updateOrder:",Id);
  console.log("customer in updateOrder:",customer);
  console.log("printingSupervisor in updateOrder:",cuttingSupervisor.cutting.cuttingSupervisor);
  const updateorder = (data) => {
    setUpdated(true);
    console.log(data);
    const payload = {
      jobcardId: Id,
      orderDate: data.orderdate,  // Note: Changed from "orderdate" to match schema
      deliveryDate: data.deliverydate,  // Changed from "deliverydate" to match schema
      customer: data.customer,
      priority: data.priority,
      styleNumber: data.styleNumber,
      description: data.description,
      fabricDetails: data.fabricDetails,
      color: data.color,
      sizeRange: data.sizeRange,
      sizeDistribution: {
        sizeDistributionS: data.sizeDistributionS,
        sizeDistributionM: data.sizeDistributionM,
        sizeDistributionL: data.sizeDistributionL,
        sizeDistributionXL: data.sizeDistributionXL,
        sizeDistribution2XL: data.sizeDistribution2XL,
        sizeDistribution3XL: data.sizeDistribution3XL
      },
      measurementNotes: data.measurementNotes,
      frontDesign: {
        imageUrl: data.frontDesignImageUrl,
        notes: data.frontDesignNotes
      },
      backDesign: {
        imageUrl: data.backDesignImageUrl,
        notes: data.backDesignNotes
      },
      // Restructure to match your schema's productionTracking structure
      productionTracking: {
        patternMaking: {
          startDate: data.patternMakingStartDate,
          endDate: data.patternMakingEndDate,
          supervisor: data.patternMakingSupervisor,
          status: data.patternMakingStatus
        },
        cutting: {
          startDate: data.cuttingStartDate,
          endDate: data.cuttingEndDate,
          supervisor: data.cuttingSupervisor,
          status: data.cuttingStatus
        },
        printing: {
          startDate: data.printingStartDate,
          endDate: data.printingEndDate,
          supervisor: data.printingSupervisor,
          status: data.printingStatus
        },
        sewing: {
          startDate: data.sewingStartDate,
          endDate: data.sewingEndDate,
          supervisor: data.sewingSupervisor,
          status: data.sewingStatus
        },
        finishing: {
          startDate: data.finishingStartDate,
          endDate: data.finishingEndDate,
          supervisor: data.finishingSupervisor,
          status: data.finishingStatus
        },
        qualityControl: {
          startDate: data.qualityControlStartDate,
          endDate: data.qualityControlEndDate,
          supervisor: data.qualityControlSupervisor,
          status: data.qualityControlStatus,
          checks: {
            measurementsCorrect: data.qcMeasurementsCorrect,
            stitchingQuality: data.qcStitchingQuality,
            colorMatching: data.qcColorMatching,
            fabricQuality: data.qcFabricQuality,
            printQuality: data.qcPrintQuality,
            washTest: data.qcWashTest,
            finishing: data.qcFinishing,
            labelsAndTags: data.qcLabelsAndTags,
            notes: data.qcNotes
          }
        },
        packaging: {
          startDate: data.packagingStartDate,
          endDate: data.packagingEndDate,
          supervisor: data.packagingSupervisor,
          status: data.packagingStatus
        }
      }
    };
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
        <div>
        <TopicBar text="Add Orders" userName="Vishwa Dissanayake"/>
        <UpdateJobCard 
          updateorder={updateorder} 
          updated={updated} 
          Id={Id}
          orderdate={orderdate}
          deliverydate={deliverydate}
          customer={customer}
          priority={priority}
          styleNumber={styleNumber}
          totalQuantity={totalQuantity}
          description={description}
          fabricDetails={fabricDetails}
          color={color}
          sizeRange={sizeRange}
          sizeDistributionS={sizeDistributionS}
          sizeDistributionM={sizeDistributionM}
          sizeDistributionL={sizeDistributionL}
          sizeDistributionXL={sizeDistributionXL}
          sizeDistribution2XL={sizeDistribution2XL}
          sizeDistribution3XL={sizeDistribution3XL}

          measurementNotes={measurementNotes}

         frontDesignImageUrl= {frontDesignImageUrl}
         frontDesignNotes= {frontDesignNotes}
         backDesignImageUrl= {backDesignImageUrl}
         backDesignNotes= {backDesignNotes}
         patternMakingStartDate= {patternMakingStartDate}
         patternMakingEndDate= {patternMakingEndDate}
         patternMakingSupervisor= {patternMakingSupervisor}
         patternMakingStatus= {patternMakingStatus}
         cuttingStartDate= {cuttingStartDate}
         cuttingEndDate= {cuttingEndDate}
         cuttingSupervisor= {cuttingSupervisor}

          cuttingStatus={cuttingStatus}
          printingStartDate={printingStartDate}
          printingEndDate={printingEndDate}
          printingSupervisor={printingSupervisor}
          printingStatus={printingStatus}
          sewingStartDate={sewingStartDate}
          sewingEndDate={sewingEndDate}
          sewingSupervisor={sewingSupervisor}
          sewingStatus={sewingStatus}
          finishingStartDate={finishingStartDate}
          finishingEndDate={finishingEndDate}
          finishingSupervisor={finishingSupervisor}
          finishingStatus={finishingStatus}
          qualityControlStartDate={qualityControlStartDate}
          qualityControlEndDate={qualityControlEndDate}
          qualityControlSupervisor={qualityControlSupervisor}
          qualityControlStatus={qualityControlStatus}
          packagingStartDate={packagingStartDate}
          packagingEndDate={packagingEndDate}
          packagingSupervisor={packagingSupervisor}
          packagingStatus={packagingStatus}
          qcMeasurementsCorrect={qcMeasurementsCorrect}
          qcStitchingQuality={qcStitchingQuality}
          qcColorMatching={qcColorMatching}
          qcFabricQuality={qcFabricQuality}
          qcPrintQuality={qcPrintQuality}
          qcWashTest={qcWashTest}
          qcFinishing={qcFinishing}
          qcLabelsAndTags={qcLabelsAndTags}
          qcNotes={qcNotes}
        
          />
        </div> 
        
    </>
  )
  }

export default UpdateOrder
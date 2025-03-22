const orders=require('./model');

const getOrders=(req,res,next)=>{
    orders.find()
    .then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });

};

const addOrder=(req,res,next)=>{
    const order=new orders({
        orderDate: req.body.orderDate,
        deliveryDate: req.body.deliveryDate,
        customer: req.body.customer,
        priority: req.body.priority,
        styleNumber: req.body.styleNumber,
        totalQuantity: req.body.totalQuantity,
        description: req.body.description,
        fabricDetails: req.body.fabricDetails,
        color: req.body.color,
        sizeRange: req.body.sizeRange,
        
        // Size Distribution - use the nested structure
        sizeDistribution: {
            sizeDistributionS: req.body.sizeDistribution.sizeDistributionS,
            sizeDistributionM: req.body.sizeDistribution.sizeDistributionM,
            sizeDistributionL: req.body.sizeDistribution.sizeDistributionL,
            sizeDistributionXL: req.body.sizeDistribution.sizeDistributionXL,
            sizeDistribution2XL: req.body.sizeDistribution.sizeDistribution2XL,
            sizeDistribution3XL: req.body.sizeDistribution.sizeDistribution3XL
        },
        
        // Continue with the rest of your fields...
        measurementNotes: req.body.measurementNotes,
        
        // Design Information
        frontDesign: {
            imageUrl: req.body.frontDesignImageUrl,
            notes: req.body.frontDesignNotes
        },
        backDesign: {
            imageUrl: req.body.backDesignImageUrl,
            notes: req.body.backDesignNotes
        },
        
        // Production Tracking
        productionTracking: {
            patternMaking: {
                startDate: req.body.patternMakingStartDate,
                endDate: req.body.patternMakingEndDate,
                supervisor: req.body.patternMakingSupervisor,
                status: req.body.patternMakingStatus
            },
            cutting: {
                startDate: req.body.cuttingStartDate,
                endDate: req.body.cuttingEndDate,
                supervisor: req.body.cuttingSupervisor,
                status: req.body.cuttingStatus
            },
            printing: {
                startDate: req.body.printingStartDate,
                endDate: req.body.printingEndDate,
                supervisor: req.body.printingSupervisor,
                status: req.body.printingStatus
            },
            sewing: {
                startDate: req.body.sewingStartDate,
                endDate: req.body.sewingEndDate,
                supervisor: req.body.sewingSupervisor,
                status: req.body.sewingStatus
            },
            finishing: {
                startDate: req.body.finishingStartDate,
                endDate: req.body.finishingEndDate,
                supervisor: req.body.finishingSupervisor,
                status: req.body.finishingStatus
            },
            qualityControl: {
                startDate: req.body.qualityControlStartDate,
                endDate: req.body.qualityControlEndDate,
                supervisor: req.body.qualityControlSupervisor,
                status: req.body.qualityControlStatus,
                checks: {
                    measurementsCorrect: req.body.qcMeasurementsCorrect,
                    stitchingQuality: req.body.qcStitchingQuality,
                    colorMatching: req.body.qcColorMatching,
                    fabricQuality: req.body.qcFabricQuality,
                    printQuality: req.body.qcPrintQuality,
                    washTest: req.body.qcWashTest,
                    finishing: req.body.qcFinishing,
                    labelsAndTags: req.body.qcLabelsAndTags,
                    notes: req.body.qcNotes
                }
            },
            packaging: {
                startDate: req.body.packagingStartDate,
                endDate: req.body.packagingEndDate,
                supervisor: req.body.packagingSupervisor,
                status: req.body.packagingStatus
            }
        }
    });
    order.save()
    .then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });

};

const updateOrder=(req,res,next)=>{
        const jobcardId=req.body.jobcardId;
    orders.updateOne({jobcardId:jobcardId},{
        orderDate: req.body.orderDate,
        deliveryDate: req.body.deliveryDate,
        customer: req.body.customer,
        priority: req.body.priority,
        styleNumber: req.body.styleNumber,
        totalQuantity: req.body.totalQuantity,
        description: req.body.description,
        fabricDetails: req.body.fabricDetails,
        color: req.body.color,
        sizeRange: req.body.sizeRange,
        
        // Size Distribution - use the nested structure
        sizeDistribution: {
            sizeDistributionS: req.body.sizeDistribution.sizeDistributionS,
            sizeDistributionM: req.body.sizeDistribution.sizeDistributionM,
            sizeDistributionL: req.body.sizeDistribution.sizeDistributionL,
            sizeDistributionXL: req.body.sizeDistribution.sizeDistributionXL,
            sizeDistribution2XL: req.body.sizeDistribution.sizeDistribution2XL,
            sizeDistribution3XL: req.body.sizeDistribution.sizeDistribution3XL
        },
        
        // Continue with the rest of your fields...
        measurementNotes: req.body.measurementNotes,
        
        // Design Information
        frontDesign: {
            imageUrl: req.body.frontDesignImageUrl,
            notes: req.body.frontDesignNotes
        },
        backDesign: {
            imageUrl: req.body.backDesignImageUrl,
            notes: req.body.backDesignNotes
        },
        
        // Production Tracking
        productionTracking: {
            patternMaking: {
                startDate: req.body.patternMakingStartDate,
                endDate: req.body.patternMakingEndDate,
                supervisor: req.body.patternMakingSupervisor,
                status: req.body.patternMakingStatus
            },
            cutting: {
                startDate: req.body.cuttingStartDate,
                endDate: req.body.cuttingEndDate,
                supervisor: req.body.cuttingSupervisor,
                status: req.body.cuttingStatus
            },
            printing: {
                startDate: req.body.printingStartDate,
                endDate: req.body.printingEndDate,
                supervisor: req.body.printingSupervisor,
                status: req.body.printingStatus
            },
            sewing: {
                startDate: req.body.sewingStartDate,
                endDate: req.body.sewingEndDate,
                supervisor: req.body.sewingSupervisor,
                status: req.body.sewingStatus
            },
            finishing: {
                startDate: req.body.finishingStartDate,
                endDate: req.body.finishingEndDate,
                supervisor: req.body.finishingSupervisor,
                status: req.body.finishingStatus
            },
            qualityControl: {
                startDate: req.body.qualityControlStartDate,
                endDate: req.body.qualityControlEndDate,
                supervisor: req.body.qualityControlSupervisor,
                status: req.body.qualityControlStatus,
                checks: {
                    measurementsCorrect: req.body.qcMeasurementsCorrect,
                    stitchingQuality: req.body.qcStitchingQuality,
                    colorMatching: req.body.qcColorMatching,
                    fabricQuality: req.body.qcFabricQuality,
                    printQuality: req.body.qcPrintQuality,
                    washTest: req.body.qcWashTest,
                    finishing: req.body.qcFinishing,
                    labelsAndTags: req.body.qcLabelsAndTags,
                    notes: req.body.qcNotes
                }
            },
            packaging: {
                startDate: req.body.packagingStartDate,
                endDate: req.body.packagingEndDate,
                supervisor: req.body.packagingSupervisor,
                status: req.body.packagingStatus
            }
    }
        }).then((result)=>{
            res.json(result);
        }).catch((err)=>{
            console.log(err);
        });
    };

const deleteOrder=(req,res,next)=>{
    const orderId=req.body.orderId;
    orders.deleteOne({orderId:orderId})
    .then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });
}; 

exports.getOrders=getOrders;
exports.addOrder=addOrder;  
exports.updateOrder=updateOrder;
exports.deleteOrder=deleteOrder;


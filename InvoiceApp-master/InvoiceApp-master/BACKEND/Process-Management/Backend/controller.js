const { request } = require("express");
const orders = require("./model");

const getOrders = (req, res, next) => {
  orders
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOrder = (req, res, next) => {
  const jobId = req.query.jobcardId;

  orders
    .findOne({ jobcardId: jobId })
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch targets" });
    });
};

const getOrderById = async (req, res) => {
  try {
    const { jobcardId } = req.body; // Get orderId from the request body

    // Validate the input
    if (!jobcardId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Query the database for the order by ID
    const order = await orders.findOne({ jobcardId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the found order
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addOrder = (req, res, next) => {
  const order = new orders({
    orderDate: req.body.orderDate,
    deliveryDate: req.body.deliveryDate,
    customer: req.body.customer,
    priority: req.body.priority,
    styleNumber: req.body.styleNumber,
    totalQuantity: req.body.total, // Adjusted based on your data structure
    description: req.body.description,
    fabricDetails: req.body.fabricDetails,
    color: req.body.color,
    wait: req.body.wait,
    sizeRange: req.body.sizeRange,
    isCancelled:req.body.isCancelled,
    progress:req.body.progress,
    status:req.body.status,

    // Size Distribution - accessing the correct nested structure
    sizeDistribution: {
      sizeDistributionS: req.body.sizeDistribution.sizeDistributionS,
      sizeDistributionM: req.body.sizeDistribution.sizeDistributionM,
      sizeDistributionL: req.body.sizeDistribution.sizeDistributionL,
      sizeDistributionXL: req.body.sizeDistribution.sizeDistributionXL,
      sizeDistribution2XL: req.body.sizeDistribution.sizeDistribution2XL,
      sizeDistribution3XL: req.body.sizeDistribution.sizeDistribution3XL,
    },

    measurementNotes: req.body.measurementNotes,

    // Design Information
    frontDesign: {
      imageUrl: req.body.frontDesign.imageUrl,
      notes: req.body.frontDesign.notes,
    },
    backDesign: {
      imageUrl: req.body.backDesign.imageUrl,
      notes: req.body.backDesign.notes,
    },

    // Production Tracking
    productionTracking: {
      patternMaking: {
        startDate: req.body.productionTracking.patternMaking.startDate,
        endDate: req.body.productionTracking.patternMaking.endDate,
        supervisor: req.body.productionTracking.patternMaking.supervisor,
        status: req.body.productionTracking.patternMaking.status,
      },
      cutting: {
        startDate: req.body.productionTracking.cutting.startDate,
        endDate: req.body.productionTracking.cutting.endDate,
        supervisor: req.body.productionTracking.cutting.supervisor,
        status: req.body.productionTracking.cutting.status,
      },
      printing: {
        startDate: req.body.productionTracking.printing.startDate,
        endDate: req.body.productionTracking.printing.endDate,
        supervisor: req.body.productionTracking.printing.supervisor,
        status: req.body.productionTracking.printing.status,
      },
      sewing: {
        startDate: req.body.productionTracking.sewing.startDate,
        endDate: req.body.productionTracking.sewing.endDate,
        supervisor: req.body.productionTracking.sewing.supervisor,
        status: req.body.productionTracking.sewing.status,
      },
      finishing: {
        startDate: req.body.productionTracking.finishing.startDate,
        endDate: req.body.productionTracking.finishing.endDate,
        supervisor: req.body.productionTracking.finishing.supervisor,
        status: req.body.productionTracking.finishing.status,
      },
      qualityControl: {
        startDate: req.body.productionTracking.qualityControl.startDate,
        endDate: req.body.productionTracking.qualityControl.endDate,
        supervisor: req.body.productionTracking.qualityControl.supervisor,
        status: req.body.productionTracking.qualityControl.status,
        checks: {
          measurementsCorrect:
            req.body.productionTracking.qualityControl.checks
              .measurementsCorrect,
          stitchingQuality:
            req.body.productionTracking.qualityControl.checks.stitchingQuality,
          colorMatching:
            req.body.productionTracking.qualityControl.checks.colorMatching,
          fabricQuality:
            req.body.productionTracking.qualityControl.checks.fabricQuality,
          printQuality:
            req.body.productionTracking.qualityControl.checks.printQuality,
          washTest: req.body.productionTracking.qualityControl.checks.washTest,
          finishing:
            req.body.productionTracking.qualityControl.checks.finishing,
          labelsAndTags:
            req.body.productionTracking.qualityControl.checks.labelsAndTags,
          notes: req.body.productionTracking.qualityControl.checks.notes,
        },
      },
      packaging: {
        startDate: req.body.productionTracking.packaging.startDate,
        endDate: req.body.productionTracking.packaging.endDate,
        supervisor: req.body.productionTracking.packaging.supervisor,
        status: req.body.productionTracking.packaging.status,
      },
    },
  });
  order
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrder = (req, res, next) => {
  console.log("Request body:", req.body);
  const jobcardId = req.body.jobcardId;
  orders
    .updateOne(
      { jobcardId: jobcardId },
      {
        orderDate: req.body.orderdate,
        deliveryDate: req.body.deliverydate,
        customer: req.body.customer,
        priority: req.body.priority,
        styleNumber: req.body.styleNumber,
        totalQuantity: req.body.total, // Adjusted based on your data structure
        description: req.body.description,
        fabricDetails: req.body.fabricDetails,
        color: req.body.color,
        wait: req.body.wait,
        sizeRange: req.body.sizeRange,
        isCancelled:req.body.isCancelled,
        progress:req.body.progress,
        status:req.body.status,

        // Size Distribution - accessing the correct nested structure
        sizeDistribution: {
          sizeDistributionS: req.body.sizeDistribution.sizeDistributionS,
          sizeDistributionM: req.body.sizeDistribution.sizeDistributionM,
          sizeDistributionL: req.body.sizeDistribution.sizeDistributionL,
          sizeDistributionXL: req.body.sizeDistribution.sizeDistributionXL,
          sizeDistribution2XL: req.body.sizeDistribution.sizeDistribution2XL,
          sizeDistribution3XL: req.body.sizeDistribution.sizeDistribution3XL,
        },

        measurementNotes: req.body.measurementNotes,

        // Design Information
        frontDesign: {
          imageUrl: req.body.frontDesign.imageUrl,
          notes: req.body.frontDesign.notes,
        },
        backDesign: {
          imageUrl: req.body.backDesign.imageUrl,
          notes: req.body.backDesign.notes,
        },

        // Production Tracking
        productionTracking: {
          patternMaking: {
            startDate: req.body.productionTracking.patternMaking.startDate,
            endDate: req.body.productionTracking.patternMaking.endDate,
            supervisor: req.body.productionTracking.patternMaking.supervisor,
            status: req.body.productionTracking.patternMaking.status,
          },
          cutting: {
            startDate: req.body.productionTracking.cutting.startDate,
            endDate: req.body.productionTracking.cutting.endDate,
            supervisor: req.body.productionTracking.cutting.supervisor,
            status: req.body.productionTracking.cutting.status,
          },
          printing: {
            startDate: req.body.productionTracking.printing.startDate,
            endDate: req.body.productionTracking.printing.endDate,
            supervisor: req.body.productionTracking.printing.supervisor,
            status: req.body.productionTracking.printing.status,
          },
          sewing: {
            startDate: req.body.productionTracking.sewing.startDate,
            endDate: req.body.productionTracking.sewing.endDate,
            supervisor: req.body.productionTracking.sewing.supervisor,
            status: req.body.productionTracking.sewing.status,
          },
          finishing: {
            startDate: req.body.productionTracking.finishing.startDate,
            endDate: req.body.productionTracking.finishing.endDate,
            supervisor: req.body.productionTracking.finishing.supervisor,
            status: req.body.productionTracking.finishing.status,
          },
          qualityControl: {
            startDate: req.body.productionTracking.qualityControl.startDate,
            endDate: req.body.productionTracking.qualityControl.endDate,
            supervisor: req.body.productionTracking.qualityControl.supervisor,
            status: req.body.productionTracking.qualityControl.status,
            checks: {
              measurementsCorrect:
                req.body.productionTracking.qualityControl.checks
                  .measurementsCorrect,
              stitchingQuality:
                req.body.productionTracking.qualityControl.checks
                  .stitchingQuality,
              colorMatching:
                req.body.productionTracking.qualityControl.checks.colorMatching,
              fabricQuality:
                req.body.productionTracking.qualityControl.checks.fabricQuality,
              printQuality:
                req.body.productionTracking.qualityControl.checks.printQuality,
              washTest:
                req.body.productionTracking.qualityControl.checks.washTest,
              finishing:
                req.body.productionTracking.qualityControl.checks.finishing,
              labelsAndTags:
                req.body.productionTracking.qualityControl.checks.labelsAndTags,
              notes: req.body.productionTracking.qualityControl.checks.notes,
            },
          },
          packaging: {
            startDate: req.body.productionTracking.packaging.startDate,
            endDate: req.body.productionTracking.packaging.endDate,
            supervisor: req.body.productionTracking.packaging.supervisor,
            status: req.body.productionTracking.packaging.status,
          },
        },
      }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteOrder = (req, res, next) => {
  const jobcardId = req.body.jobcardId;
  orders
    .deleteOne({ jobcardId: jobcardId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.findOrderById = getOrderById;
exports.getOrder = getOrder;

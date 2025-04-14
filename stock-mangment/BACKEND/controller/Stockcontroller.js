const Material = require("../models/material");
const Stock = require("../models/stock");
const MaterialUsage = require("../models/materialUsage");
const moment = require("moment");

// this is for add stock part
const addStock = async (req, res, next) => {
    try {
        const { itemName, category, quantity, price, supplier,supplierCountry } = req.body;
    
        if (!itemName || !category || !quantity || !price || !supplierCountry) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        // Check if material exists in Material collection
        let material = await Material.findOne({ itemName });
    
        if (material) {
          // if material Update the existing material quantity
          material.quantity += Number(quantity);
          await material.save();
        } else {
          // Add new material to the Material collection
          material = new Material({ category, itemName, quantity,supplierCountry });
          await material.save();
        }

        const newStock = new Stock({ itemName, category, quantity, price, supplier,supplierCountry });
        await newStock.save();
    
        res.status(201).json({ message: "Stock added successfully", stock: newStock, material,supplierCountry });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    
  };


const CATEGORY_THRESHOLDS = {
  "Fabrics": 200,
  "Trims & Accessories": 500,
  "Lining & Padding Materials": 300,
  "Decorative & Functional Add-ons": 100,
};

const stocklevel = async (req, res, next) => {
    try {
        const materials = await Material.find();
        const stockLevels = materials.map(material => {
          const threshold = CATEGORY_THRESHOLDS[material.category] || 0; // Default to 0 if category not found
          const status = material.quantity < threshold ? "Low Stock" : "In Stock";
          return {
            ...material._doc,
            status,
          };
        });
        res.status(200).json(stockLevels);
      } catch (error) {
        console.error("Error fetching stock levels:", error);
        res.status(500).json({ message: "Server error", error });
      }
    
  };

// select catogary for each item
  const selectCatogary = async (req, res, next) => {
   try {
       const categories = await Material.distinct("category");
       res.json(categories.filter(cat => cat !== "Fabric"));
     } catch (error) {
       res.status(500).json({ message: "Server error", error });
     }
   };

   // according to the categary fetch data from database to add chart 

   const chart_data = async (req, res, next) => {
    try {
       const { category } = req.params;
       const startDate = moment().startOf("month").toDate();
       const endDate = moment().endOf("month").toDate();
   
       // Get total stock quantity
       const materials = await Material.find({ category });
       const totalQuantity = materials.reduce((sum, mat) => sum + mat.quantity, 0);
   
       // Calculate Y-axis interval (divide into 5, round up)
       const yAxisInterval = Math.ceil(totalQuantity / 5);
   
       // Fetch stock added this month
       const stockAdded = await Stock.aggregate([
         { $match: { category, dateAdded: { $gte: startDate, $lte: endDate } } },
         { $group: { _id: { $dayOfMonth: "$dateAdded" }, totalAdded: { $sum: "$quantity" } } }
       ]);
   
       // Fetch stock used this month
       const stockUsed = await MaterialUsage.aggregate([
         { $match: { category, dateUsed: { $gte: startDate, $lte: endDate } } },
         { $group: { _id: { $dayOfMonth: "$dateUsed" }, totalUsed: { $sum: "$quantityUsed" } } }
       ]);
   
       // Format data for 31-day graph
       const chartData = Array.from({ length: 31 }, (_, index) => {
         const day = index + 1;
         return {
           date: `Day ${day}`,
           stockAdded: stockAdded.find(item => item._id === day)?.totalAdded || 0,
           stockUsed: stockUsed.find(item => item._id === day)?.totalUsed || 0
         };
       });
   
       res.json({ chartData, totalQuantity, yAxisInterval });
     } catch (error) {
       res.status(500).json({ message: "Server error", error });
     }
   };

//purchase history details get from database

   const PurchaseHistory = async (req, res, next) => {  
     try {
        const { startDate, endDate } = req.query;
        let query = {};
    
        if (startDate && endDate) {
          query.dateAdded = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          };
        }
    
        const recentStocks = await Stock.find(query).sort({ dateAdded: -1 });
        res.status(200).json(recentStocks);
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    };
    const removestock = async (req, res, next) => {  
     try {
        const { id } = req.params;
        const { itemName, category, quantity } = req.body;
    
        // Remove stock entry
        const deletedStock = await Stock.findByIdAndDelete(id);
        if (!deletedStock) {
          return res.status(404).json({ message: "Stock item not found" });
        }
    
        // Update material quantity
        const material = await Material.findOne({ itemName, category });
        if (material) {
          material.quantity -= quantity;
          await material.save();
        }
    
        res.status(200).json({ message: "Stock item removed and material updated" });
      } catch (error) {
        res.status(500).json({ message: "Error removing stock item", error });
      }
    }
  const getallmaterial = async (req, res, next) => {  
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// material use part
const materialuse = async (req, res, next) => { 
 try {
    const { category, itemName, quantity, description } = req.body;

    if (!category || !itemName || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const material = await Material.findOne({ itemName });

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    if (material.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Reduce quantity in Material collection 
    material.quantity -= quantity;
    await material.save();

    // Save usage record in MaterialUsage collection
    const usageRecord = new MaterialUsage({
      category,
      itemName,
      quantityUsed: quantity,
      description,
    });

    await usageRecord.save();

    res.status(200).json({ message: "Material used successfully", usageRecord });
  } catch (error) {
    console.error("Error in /use route:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

//display material  usage history
const materialuseHistory = async (req, res, next) => { 
 
    try {
      const usageRecords = await MaterialUsage.find().sort({ _id: -1 }); 
      res.status(200).json(usageRecords);
    } catch (error) {
      console.error("Error fetching material usage:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
// delete material use record 

const useRecordDelete = async (req, res, next) =>{
  
    try {
      const { id } = req.params;
  
      // Find the usage record to be deleted
      const deletedUsage = await MaterialUsage.findById(id);
      if (!deletedUsage) {
        return res.status(404).json({ message: "Usage record not found" });
      }
  
      // Find the corresponding material and increment its quantity
      const material = await Material.findOne({ itemName: deletedUsage.itemName });
      if (material) {
        material.quantity += deletedUsage.quantityUsed;
        await material.save();
      } else {
        return res.status(404).json({ message: "Material not found" });
      }
  
      // Delete the usage record
      await MaterialUsage.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Usage record deleted successfully" });
    } catch (error) {
      console.error("Error deleting material usage record:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

exports.useRecordDelete = useRecordDelete;
exports.materialuseHistory = materialuseHistory;
exports.materialuse = materialuse;
exports.getallmaterial = getallmaterial;
exports.removestock = removestock;    
exports.PurchaseHistory = PurchaseHistory;
exports.chart_data = chart_data;
exports.selectCatogary = selectCatogary;
exports.stocklevel =stocklevel;
exports.addStock = addStock;
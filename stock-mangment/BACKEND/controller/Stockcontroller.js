const Material = require("../models/material");
const Stock = require("../models/stock");
const MaterialUsage = require("../models/materialUsage");
const moment = require("moment");
const geminiPromptFormatterModule = require('../utils/geminiPromptFormatter'); // Import the entire module
const formatGeminiPrompt = geminiPromptFormatterModule;
const { formatGeminiReportPrompt } = require("../utils/geminiReportPromptFormatter");
const { generateGeminiResponse } = require("../utils/gemini");
const PDFDocument = require('pdfkit');
const fs = require('fs');

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
 
  
//predict stock part
const predictStock = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      console.error("Prediction Error: Missing start or end date");
      return res.status(400).json({ message: "Start and end dates are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get data from exactly one year prior
    const lastYearStart = new Date(start);
    lastYearStart.setFullYear(start.getFullYear() - 1);
    const lastYearEnd = new Date(end);
    lastYearEnd.setFullYear(end.getFullYear() - 1);

    console.log("Prediction: Fetching historical data...");
    const [lastYearStock, lastYearUsage] = await Promise.all([
      Stock.find({ dateAdded: { $gte: lastYearStart, $lte: lastYearEnd } }),
      MaterialUsage.find({ dateUsed: { $gte: lastYearStart, $lte: lastYearEnd } }),
    ]);
    console.log("Prediction: Historical stock data:", lastYearStock);
    console.log("Prediction: Historical usage data:", lastYearUsage);

    if (!lastYearStock.length && !lastYearUsage.length) {
      console.warn("Prediction Warning: No historical data found for prediction");
      return res.status(404).json({ message: "No historical data found for prediction" });
    }

    console.log("Prediction: Formatting Gemini prompt...");
    const prompt = formatGeminiPrompt(lastYearStock, lastYearUsage, startDate, endDate);
    console.log("Prediction: Gemini prompt:", prompt);

    console.log("Prediction: Calling generateGeminiResponse...");
    let geminiResponse;
    try {
      geminiResponse = await generateGeminiResponse(prompt);
      console.log("Prediction: Gemini response:", geminiResponse);
    } catch (geminiError) {
      console.error("Prediction Error: Error calling Gemini API:", geminiError);
      return res.status(500).json({
        success: false,
        message: "Failed to get response from AI.",
        error: geminiError.message,
      });
    }

    console.log("Prediction: Parsing Gemini response...");
    try {
      const prediction = parseGeminiResponse(geminiResponse);
      console.log("Prediction: Parsed prediction:", prediction);
      res.status(200).json({ success: true, prediction });
    } catch (parseError) {
      console.error("Prediction Error: Failed to parse Gemini response:", parseError);
      return res.status(500).json({
        success: false,
        message: "Failed to process prediction from AI.",
        error: parseError.message,
      });
    }
  } catch (error) {
    console.error("Prediction Error: General error in predictStock:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate prediction",
      error: error.message,
    });
  }
};

// Helper function to parse Gemini's response
function parseGeminiResponse(text) {
  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);
    const data = JSON.parse(jsonString);
    const totalBudget = data.details.reduce((sum, item) => sum + (item.Price || 0), 0);
    return { details: data.details, totalBudget };
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    throw new Error("Invalid prediction format from AI");
  }
}

const getReportData = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Validation
        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Start and end dates are required"
            });
        }

        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                success: false,
                message: "End date must be after start date"
            });
        }

        // Fetch data
        const [stockData, usageData] = await Promise.all([
            Stock.find({
                dateAdded: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }).limit(5000),
            MaterialUsage.find({
                dateUsed: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }).limit(5000)
        ]);

        if (!stockData.length && !usageData.length) {
            return res.status(404).json({
                success: false,
                message: "No data found for selected period"
            });
        }

        // Generate report prompt
        const prompt = formatGeminiReportPrompt(stockData, usageData, startDate, endDate);

        // Get response from Gemini
        const geminiResponse = await generateGeminiResponse(prompt);

        // Generate structured PDF from Gemini's response
        const pdfBuffer = await generateClearStructuredPDF(geminiResponse, startDate, endDate);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=stock_report_${startDate}_to_${endDate}.pdf`
        });
        res.send(pdfBuffer);

    } catch (error) {
        console.error("Report generation error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate report",
            error: error.message
        });
    }
};

async function generateClearStructuredPDF(reportText, startDate, endDate) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        doc.fontSize(16).font('Helvetica-Bold').text('Stock Report', { align: 'center' }).moveDown(0.5);
        doc.fontSize(10).text(`Period: ${startDate} to ${endDate}`, { align: 'center' }).moveDown(1);

        const lines = reportText.split('\n');
        let currentSectionTitle = null;
        const boldRegex = /\*\*(.*?)\*\*/g;

        const table = {
            headers: [],
            rows: []
        };
        let inTable = false;

        lines.forEach(line => {
            line = line.trim();

            // Handle Section Titles
            if (line.startsWith('**') && line.endsWith('**')) {
                if (currentSectionTitle) {
                    doc.moveDown(1); // Add space after the previous section
                }
                currentSectionTitle = line.substring(2, line.length - 2).trim();
                doc.fontSize(14).font('Helvetica-Bold').text(currentSectionTitle).font('Helvetica').fontSize(10).moveDown(0.5);
                inTable = false;
                table.headers = [];
                table.rows = [];
            }
            // Handle Table Rows
            else if (line.startsWith('|') && line.endsWith('|')) {
                const columns = line.split('|').map(col => col.trim());
                if (columns.length > 2) {
                    if (columns[1].startsWith(':---')) {
                        inTable = true;
                        renderTable(doc, table);
                        table.headers = [];
                        table.rows = [];
                        doc.moveDown(0.7);
                    } else if (!inTable) {
                        table.headers = columns.slice(1, -1).map(header => header.replace(boldRegex, '$1')); // Remove bold markers from headers
                    } else {
                        table.rows.push(columns.slice(1, -1).map(cell => cell.replace(boldRegex, '$1'))); // Remove bold markers from cells
                    }
                }
            }
            // Handle List Items
            else if (line.startsWith('* ')) {
                const text = line.substring(2).replace(boldRegex, (match, p1) => p1); // Remove bold markers from list items
                doc.text(`• ${text}`).moveDown(0.3);
            }
            // Handle Regular Text (Paragraphs)
            else if (line.length > 0) {
                const formattedLine = line.replace(boldRegex, (match, p1) => {
                    doc.font('Helvetica-Bold').text(p1, { continued: true }).font('Helvetica');
                    return ''; // Remove the bold markers from the original line
                });
                doc.text(formattedLine).moveDown(0.4); // Add a bit more space between sentences/ideas
            }
        });

        if (table.rows.length > 0) {
            renderTable(doc, table);
        }

        doc.end();
    });
}

function renderTable(doc, table) {
    const startX = doc.x;
    let y = doc.y;
    const columnWidths = Array(table.headers.length).fill(0);
    const padding = 5;
    const lineHeight = 12;

    // Calculate column widths
    [table.headers, ...table.rows].forEach(row => {
        row.forEach((cell, i) => {
            const width = doc.widthOfString(cell);
            if (width > columnWidths[i]) {
                columnWidths[i] = width;
            }
        });
    });

    // Draw header
    doc.font('Helvetica-Bold');
    let currentX = startX;
    table.headers.forEach((header, i) => {
        doc.text(header, currentX + padding, y);
        currentX += columnWidths[i] + 2 * padding;
    });
    doc.moveDown(lineHeight / 2);
    doc.lineWidth(0.5).moveTo(startX, doc.y).lineTo(currentX, doc.y).stroke();
    doc.font('Helvetica');
    doc.moveDown(lineHeight / 2);
    y = doc.y;

    // Draw rows
    table.rows.forEach(row => {
        currentX = startX;
        row.forEach((cell, i) => {
            doc.text(cell, currentX + padding, y);
            currentX += columnWidths[i] + 2 * padding;
        });
        y += lineHeight;
    });
}

  module.exports = {
    useRecordDelete,
    materialuseHistory,
    materialuse,
    getallmaterial,
    removestock,
    PurchaseHistory,
    chart_data,
    selectCatogary,
    stocklevel,
    addStock,
    predictStock,
    getReportData,
  };
  


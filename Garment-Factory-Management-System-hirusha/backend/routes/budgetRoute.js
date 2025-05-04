const router = require("express").Router();
let Budget = require("../model/Budget");
const Counter = require('../model/Counter');

router.route("/add").post(async (req, res) => {
  try {
    // Get next sequence for ExpenseID
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'expenseid' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const ExpenseID = counter.seq;

    const { Date: DateField, TransportBudget_LKR, StockBudget_LKR, SalaryBudget_LKR, OtherCostsBudget_LKR, TotalBudget_LKR } = req.body;

    const newBudget = new Budget({
      ExpenseID,
      Date: DateField,
      TransportBudget_LKR,
      StockBudget_LKR,
      SalaryBudget_LKR,
      OtherCostsBudget_LKR,
      TotalBudget_LKR
    });

    await newBudget.save();
    res.json("Budget Added Successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add budget" });
  }
});



router.route("/").get((req,res)=>{

    Budget.find().then((budget)=>{
        res.json(budget)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route('/post/:id').get((req,res)=>{
    Budget.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})


router.route("/update/:id").put(async(req, res)=>{
    let budgetUpdateID = req.params.id;
    const { ExpenseID, Date: DateField, TransportBudget_LKR, StockBudget_LKR, SalaryBudget_LKR, OtherCostsBudget_LKR, TotalBudget_LKR } = req.body;

    // Only include ExpenseID if provided
    const updateBudget = {
        Date: DateField,
        TransportBudget_LKR,
        StockBudget_LKR,
        SalaryBudget_LKR,
        OtherCostsBudget_LKR,
        TotalBudget_LKR
    };
    if (ExpenseID !== undefined && ExpenseID !== null && ExpenseID !== "") {
        updateBudget.ExpenseID = ExpenseID;
    }

    const update = await Budget.findByIdAndUpdate(budgetUpdateID, updateBudget)
    .then(()=>{
        res.status(200).send({status: "Budget updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})


router.route("/delete/:id").delete(async(req,res)=>{

    let deleteBudget = req.params.id;
    
    await Budget.findByIdAndDelete(deleteBudget)
    .then(()=>{
        res.status(200).send({status: "Budget deleted"});
    }).catch((errr)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete refund"});
    })

})
    




module.exports = router;
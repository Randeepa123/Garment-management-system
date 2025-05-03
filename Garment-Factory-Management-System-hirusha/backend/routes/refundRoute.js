const router = require("express").Router();
let Refund = require("../model/Refund");

router.route("/add").post(async (req, res) => {
    try {
        const { CustomerID, OrderID, RequestedDate, Quantity, Amount_LKR } = req.body;

        // Basic validation
        if (!CustomerID || !OrderID || !RequestedDate || !Quantity || !Amount_LKR) {
            return res.status(400).json({ error: "All fields are required." });
        }
        if (Number(Quantity) <= 0 || Number(Amount_LKR) <= 0) {
            return res.status(400).json({ error: "Quantity and Amount_LKR must be positive numbers." });
        }

        const newRefund = new Refund({
            CustomerID,
            OrderID,
            RequestedDate: new Date(RequestedDate),
            Quantity: Number(Quantity),
            Amount_LKR: Number(Amount_LKR)
        });

        const savedRefund = await newRefund.save();
        res.status(201).json({
            message: "Refund added successfully!",
            refund: savedRefund
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});



router.route("/").get((req,res)=>{

    Refund.find().exec((err, refund) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingRefunds:refund
        });
    });
        
    });


    router.get("/post/:id",(req,res)=>{

        let postID = req.params.id;

        Refund.findById(postID, (err,refund) =>{
            if(err){
                return res.status(400).json({success:false, err});
            }
            return res.status(200).json({
                success:true,
                refund
            });
        });
    });         






router.put("/update/:id",(req,res)=>{
    Refund.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err, refund)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Refund updated successfully"
            });
        });
});


router.route("/delete/:id").delete(async(req,res)=>{

    let refundDeleteID = req.params.id;
    
    await Refund.findByIdAndDelete(refundDeleteID)
    .then(()=>{
        res.status(200).send({status: "Refund deleted"});
    }).catch((errr)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete refund"});
    })

})

module.exports = router;
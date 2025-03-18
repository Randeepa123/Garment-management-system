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
        jobcardId:req.body.jobcardId,
        garmenttype:req.body.garmenttype,
        quantity:req.body.quantity,
        date:req.body.date,
        enddate:req.body.enddate,
        status:req.body.status
    });
    order.save()
    .then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });

};

const updateOrder=(req,res,next)=>{
    const {jobcardId,garmenttype,quantity,date,enddate,status}=req.body;
    orders.updateOne({jobcardId:jobcardId},{
        garmenttype:garmenttype,
        quantity:quantity,
        date:date,
        enddate:enddate,
        status:status
    }).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });
};

const deleteOrder=(req,res,next)=>{
    const jobcardId=req.body.jobcardId;
    orders.deleteOne({jobcardId:jobcardId})
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


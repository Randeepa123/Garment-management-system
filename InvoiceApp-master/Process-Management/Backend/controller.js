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
        orderdate:req.body.orderdate,
        deliverydate:req.body.deliverydate,
        customer:req.body.customer,
    });
    order.save()
    .then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    });

};

const updateOrder=(req,res,next)=>{
    const {orderdate,deliverydate,customer,orderId}=req.body;
    orders.updateOne({orderId:orderId},{
        orderdate:orderdate,
        deliverydate:deliverydate,
        customer:customer,
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


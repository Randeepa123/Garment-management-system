const express=require('express');
const app=express();
const cors=require('cors');
const controller=require('./controller');

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/orders',(req,res,next)=>{
    controller.getOrders(req,res,next);
    res.send();
});

app.post('/addorder',(req,res,next)=>{
    controller.addOrder(req,res,next);
    res.send();         
});  

app.post('/updateorder',(req,res,next)=>{
    controller.updateOrder(req,res,next);
    res.send(callback);
});

app.post('/deleteorder',(req,res,next)=>{
    controller.deleteOrder(req,res,next);
    res.send(callback);
});

module.exports=app; 

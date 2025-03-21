const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema=new Schema({
    orderdate:{type:Date,required:true},
    deliverydate:{type:Date,required:true},
    customer:{type:String ,required:true},
   /* priority:{type:String,required:true},
    stylenumber:{type:String ,required:true},
    quantity:{type:String ,required:true},
    description:{type:String ,required:true},
    fabricdetails:{type:String ,required:true},
    color:{type:String ,required:true},
    size:{type:String ,required:true},
   */ 
});

orderSchema.plugin(autoIncrement, {inc_field: 'orderId'});
const orders=mongoose.model('Orders',orderSchema);
module.exports=orders;
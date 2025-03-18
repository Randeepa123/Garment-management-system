const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    jobcardId:{type:String ,required:true}, 
    garmenttype:{type:String ,required:true},
    quantity:{type:Number,required:true},
    date:{type:Date,required:true},
    enddate:{type:Date,required:true},
    status:{type:String ,required:true}

});

const orders=mongoose.model('Orders',orderSchema);
module.exports=orders;
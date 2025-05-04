const mongoose=require('mongoose');
const schema=mongoose.schema;

const usreSchema=new schema({
    userName:{type:String,required:true},
    password:{type:String,required:true},
    userRole:{type:String}
});

const users=mongoose.model('users',usreSchema);
module.exports=users;
const express=require('express');
const app=express();
const cors=require('cors');
const port=3001;
const host='localhost';
const mongoose=require('mongoose');
require('dotenv').config({path:'../../InvoiceApp-master/BACKEND/.env'});
const router=require('./router');


app.use(cors());
app.use(express.json());

const DbUrl=process.env.MONGODB_URL;


const connect=async()=>{
    try{
        await mongoose.connect(DbUrl);
        console.log('Connected to DB');
    }
    catch(err){
        console.log(err);
    }
};

connect();

const server=app.listen(port,host,()=>{
    console.log(`Server is listening to http://${host}:${port}`);
});

app.use("",router);

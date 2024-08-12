const express= require('express');
const cors=require('cors');
const db_con=require('./db_con');
const formidable=require('express-formidable');
const app=express();

app.listen(5000,()=>{
    console.log("server running on 5000 port...");
})
app.use(formidable())
app.use(cors());



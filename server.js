const express=require('express');

const app=express();


app.get('/',(req,res)=>res.send('API RUNNING'));

const PORT=process.env.PORT ||5000;

const server=app.listen(
    PORT,console.log(`server running in port ${PORT} ` ));

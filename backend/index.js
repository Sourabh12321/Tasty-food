const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./router/userRouter");
const {foodRouter} = require("./router/foodRouter");
const {authenticate} = require("./middleware/authen");
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
    res.send("home page")
})



app.use("/users", userRouter)
app.use(authenticate);
app.use("/fooditem",foodRouter)


app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("working");
    }catch(err){
        console.log(err.message)
    }
})
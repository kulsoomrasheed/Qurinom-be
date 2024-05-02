const express = require('express');

const cors = require('cors');


const app = express();

app.use(cors())
require("dotenv").config()

const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { blogRouter } = require('./routes/blog.routes');


app.use(express.json())

app.get("/",(req,res)=>{
   res.send("Welcome");
})
app.use("/users",userRouter)
app.use("/blogs",blogRouter)


app.listen(process.env.port||4000,async()=>{
    try{
        await connection
    console.log('Connected to DB!');

    }
    catch(err){
console.log("Unable to connect to DB",err.message);
    }
})

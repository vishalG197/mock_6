 const express = require('express');
const cors = require('cors');
const connections= require("./db")
const UserRouter = require('./routes/UserRouter');
const BlogRouter = require('./routes/BlogRouter');
 const app = express();
 app.use(cors());
 app.use(express.json());
 app.use("/api",UserRouter);
 app.use("/api/blogs",BlogRouter);


app.get("/",(req,res)=>{
   res.status(200).json({message:"blog server running successfully"})
})

 app.listen(8080,async ()=>{
try {
   await connections;
   console.log("connection established to db and listening on http://localhost:8080")
} catch (error) {
   console.log(error.message)
}
 });
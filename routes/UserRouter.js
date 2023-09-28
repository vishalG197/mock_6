const express = require('express');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register',async (req, res) => {
try {
   const {email,password} = req.body;
   req.body.avatar="https://sp.yimg.com/ib/th?id=OIP.LL-FYOXNZ_3QwxJbyWOo3QAAAA&pid=Api&w=148&h=148&c=7&dpr=2&rs=1";

   let user = await UserModel.findOne({email});
   if(user){
      res.status(404).json({message:"user with this email is already registered"})
   }
const hashed = await bcrypt.hash(password,10);
console.log(hashed);
req.body.password = hashed;
const newuser = new UserModel({...req.body});
await newuser.save();

res.status(200).json({message:"user registration successful"});


} catch (error) {
  res.status(500).json({error:error.message}); 
}


});





router.post('/login',async (req, res) => {
   try {
      const {email,password}=req.body;
      let user = await UserModel.findOne({email});
      console.log(user)
   if(!user){
      res.status(404).json({message:"user with this email is not registered please register"})
   }
console.log(password,user.password)
   const compare =await bcrypt.compare(password,user.password);
   if(!compare){
      res.status(404).json({message:"invalid password provided correctly"})
   }

   const token = jwt.sign({userId:user._id,username:user.username},"mocke_6");
   res.status(200).json({token:token,message:"user registration successful"});

   } catch (error) {
     res.status(500).json({error:error.message}); 
   }
   
   
   });
module.exports = router;
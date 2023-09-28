const express = require("express");
const BlogModel = require("../models/BlogModel");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.use(authMiddleware);
router.post("/", async (req, res) => {
  try {
   const blog = new BlogModel({...req.body});
   await blog.save();

   res.status(200).json({message:"blog posted successfully"});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
const {title,category,sort, order}= req.query;
let obj ={};
if(title){
   obj.title = title;

}
if(category){
obj.category = category;

}
let sortObj={};
if(sort){
   // obj.sort = sort;
   if(order=="asc"){
sortObj[sort] = 1;
   } else if(order=="desc"){

      sortObj[sort] = -1;
   }

}
   const blogs = await BlogModel.find(obj,null,sortObj);
   res.status(200).json(blogs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
   const blog = await BlogModel.findByIdAndUpdate(req.params.id,req.body);
   res.status(200).json({message:"blog updated successfully",blog});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
   const blog = await BlogModel.findByIdAndDelete(req.params.id);
   res.status(200).json({message:"blog deleted successfully"});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id/like", async (req, res) => {
  try {
   const blog = await BlogModel.findById(req.params.id);
   blog.likes = blog.likes+1;
  await blog.save();
  res.status(200).json({message: "blog liked successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id/comment", async (req, res) => {
  try {
   const blog = await BlogModel.findById(req.params.id);
   blog.comment.push({
      username: req.body.username,
      content: req.body.content
   });
  await blog.save();
  res.status(200).json({message: "Comment posted successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

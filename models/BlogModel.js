const mongoose = require('mongoose');

const Schema = mongoose.Schema({
username:String,
userId:String,
title:String,
content:String,
category:String,
date:Date,
likes:Number,
comment:[
{
   username:String,
   content:String
}

],

})

const BlogModel = mongoose.model('blog',Schema);

module.exports = BlogModel;
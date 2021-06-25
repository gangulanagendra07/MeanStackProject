const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const postRoutes = require('../backend/routes/posts');
const userRoutes = require('./routes/user');



mongoose.connect(
  "mongodb+srv://Nagendra07:"+process.env.MONGO_ATLAS_PW +"@cluster0-gmzkz.mongodb.net/node-angular"
  )
.then(()=>{
  console.log("DataBase connecton succesfully.!");
})
.catch(()=>{
  console.log("DataBase Connection Failed.!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req , res , next)=>{
  res.setHeader("Access-Control-Allow-Origin" , "*");
  res.setHeader("Access-Control-Allow-Headers" , "Origin , X-Requested-With , Content-Type , Accept, Authorization");
//response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Methods" , "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
}); 

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);


module.exports = app;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs-extra");
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7hfvn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express();
app.use(express.json());
app.use(express.static('service'));
app.use(fileUpload());
app.use(cors());
const port =process.env.PORT||5000;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("car-service").collection("services");
  const addServiceCollection = client.db("car-service").collection("addService");
  const bookingCollection = client.db("car-service").collection("booking");
  console.log("database connection done");
  console.log(err);

   // Contact Form API
   app.post('/formData', (req, res) => {
    const data = req.body;
    console.log(data);
    serviceCollection.insertOne(data)
        .then(result => {
            res.send(result.insertedCount > 0)
            console.log(result);
        })
})

// Review Create Form API 
app.post('/reviewForm', (req, res) => {
  const reviewData = req.body;
  serviceCollection.insertOne(reviewData)
      .then(result => {
          res.send(result.insertedCount > 0)
          console.log(result)
      })
})

// Review Read data from server
app.get('/review', (req, res) => {
  serviceCollection.find({})
      .toArray((error, documents) => {
          res.send(documents);
      })
})


  // Add service 
  app.post('/addService', (req, res) => {
    const data=req.body;
    addServiceCollection.insertOne(data)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
   

    
})

app.get('/service',(req, res)=>{
  addServiceCollection.find({})
  .toArray((error, documents) => {
    res.send(documents);
})
  
})






    // booking formData
    app.post('/booking', (req, res) => {
      const reviewData = req.body;
      bookingCollection.insertOne(reviewData)
          .then(result => {
              res.send(result.insertedCount > 0)
              console.log(result)
          })
  })

  app.get('/booking',(req,res)=>{
    bookingCollection.find({})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })

  
    // login admin
    app.post('/loginAdmin', (req, res) => {
      const reviewData = req.body;
      serviceCollection.insertOne(reviewData)
          .then(result => {
              res.send(result.insertedCount > 0)
              console.log(result)
          })
  })

  app.get('loginAdmin',(req, res)=>{
    serviceCollection.find({})
    .toArray((err, documents)=>{
      res.send(documents)
    })
  })













  



  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.listen(port);
  
});


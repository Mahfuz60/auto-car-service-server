const express = require('express')
const cors= require('cors')
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7hfvn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
app.use(express.json());
app.use(cors());
const port = 5000
console.log(process.env.DB_PASS)

client.connect(err => {
    console.log('database connected');
    const serviceCollection = client.db("carService").collection("services");
    
  });




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT ||port);
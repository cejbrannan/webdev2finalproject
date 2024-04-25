var Express = require('express');
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

var app = Express();
app.use(cors());


const uri = "mongodb+srv://4830:Password@cluster0.uu5wuim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);



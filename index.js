const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6iupoas.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const productsCollection = client.db('emaJohn').collection('products');

    app.get('/products', async(req, res) => {
        const query = {};
        const cursor = productsCollection.find(query);
        const products = await cursor.toArray();
        const count = await productsCollection.estimatedDocumentCount();
        res.send({count, products});
    })
  } finally {

  }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Ema John Server Is Running');
})

app.listen(port, () => {
    console.log(`ema john server is running on ${port}`);
})
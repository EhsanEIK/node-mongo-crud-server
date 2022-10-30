const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// dbuser2:XB2rFYL2u00IJOsU
const uri = "mongodb+srv://dbuser2:XB2rFYL2u00IJOsU@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('CRUD Server is running');
})

app.listen(port, () => {
    console.log('server is running on', port);
})
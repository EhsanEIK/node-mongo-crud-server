const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// dbuser2:XB2rFYL2u00IJOsU
const uri = "mongodb+srv://dbuser2:XB2rFYL2u00IJOsU@cluster0.fbieij7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const usersCollection = client.db('nodeMongoCrud').collection('users');

        // show data (READ/GET Method) => [for all data]
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // get a single data (GET method) => [for single data]
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        // create data (POST method)
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // update data (PUT method)
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    address: user.address,
                    email: user.email,
                }
            }
            const result = await usersCollection.updateOne(filter, updatedUser, options);
            res.send(result);

        })

        // delete data (DELETE method)
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result)
        })

    } finally { }
}

run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('CRUD Server is running');
})

app.listen(port, () => {
    console.log('server is running on', port);
})
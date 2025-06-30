const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());
app.use(cookieParser());


//connect mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.28i6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const dbConnect = async () => {
    try {
        client.connect();
        console.log("Database Connected Successfully✅");

    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect()

const eventsCollection = client.db('eventra').collection('events')

app.get('/', (req, res) => {
    res.json({message: "Hello, Eventra!!!"})
})

// get all events
app.get('/events', async(req, res) =>{
    const events = await eventsCollection.find({}).toArray();
    // console.log(events);
    if(!events){
        res.status(404).json({success: false, message: "No events found"})
        return
    }
    res.json({success: true, events})

})
app.listen(port, () => {
    console.log(`Database is running on port ${port}`)
})
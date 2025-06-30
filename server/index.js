const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const port = process.env.PORT || 5000;

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions))
app.use(express.json());
app.use(cookieParser());



// Verify Token Middleware
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token
    // console.log(token)

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized. Logged In Again",
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // console.log(err)
            return res.json({
                success: false,
                message: "Not Authorized. Logged In Again",
            });

        }
        req.user = decoded
        next()
    })
}


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

// db collections
const eventsCollection = client.db('eventra').collection('events')
const usersCollection = client.db('eventra').collection('users')

app.get('/', (req, res) => {
    res.json({ message: "Hello, Eventra!!!" })
})

// get all events
app.get('/events', async (req, res) => {
    const events = await eventsCollection.find({}).toArray();
    // console.log(events);
    if (!events) {
        res.status(404).json({ success: false, message: "No events found" })
        return
    }
    res.json({ success: true, events })

})

// add a event
app.post('/events', async (req, res) => {
    const event = req.body
    console.log(event);
    const result = await eventsCollection.insertOne(event)
    console.log(result);
    res.status(201).send(result);

})




// custom auth system
app.post('/register', async (req, res) => {
    const { name, email, image, password } = req.body;


    const userExist = await usersCollection.findOne({ email });
    if (userExist) {
        res.status(400).json({ message: 'User already exists' });
        return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create and save the new user
    const newUser = {
        name,
        email,
        image,
        password: hashedPassword,
    };
    const user = await usersCollection.insertOne(newUser);
    
    
    const token = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({ success: true, user})



});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await usersCollection.findOne({ email });
    if (!user) {
        res.status(404).json({ message: 'No user Found for this mail' });
        return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid credentials' });
        return
    }


    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).send({ success: true })

});

// Logout
app.post('/logout', async (req, res) => {
    try {
        res
            .clearCookie('token', {
                maxAge: 0,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            })
            .send({ success: true })
        console.log('Logout successful')
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get('/protected', verifyToken, async (req, res) => {
    const user = await usersCollection.findOne({ email: req?.user?.email });
    // console.log(user);
    res.json({ success: true, user });
});

app.listen(port, () => {
    console.log(`Database is running on port ${port}`)
})
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const controllers = require('./controllers')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001
app.use(bodyParser.json());
app.use(cors())


mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.use("/api/calendar", require("./controllers/CalendarController"))
        app.use("/api/user/:userId", controllers.getUserById)
        app.use("/api/register", controllers.register)
        app.use("/api/login", controllers.login)


        app.listen(port, () => console.log('Server started'));
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

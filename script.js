const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Set up default Mongoose connection
mongoose.connect('mongodb://localhost/harishdb');

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of successful connection)
db.once('open', async function () {
    console.log('Connected to localhost/harishdb');

    // Define an endpoint for getting the list of collections
    app.get('/collections', async function (req, res) {
        // Get all collection names in the "harishdb" database
        const collections = await db.db.collections();
        const collectionNames = collections.map(collection => collection.collectionName);
        res.send(collectionNames);
    });

    // Start the server
    app.listen(3000, function () {
        console.log('Server listening on port 3000');
    });
});

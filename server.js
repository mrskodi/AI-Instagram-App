const express = require('express');
const mongoose = require('mongoose');

const port = '8010';
const app= express();
const db = require('./config/keys').mongoURI;

// Write the first test route
app.get('/', (req, res) => res.send('Route test successful and test nodemon successful!'));

// Check if server running on port 8010
app.listen(port, () => console.log(`Server successfully listening on port ${port}`));

// Check if connection to db established
mongoose.connect(db)
        .then(() => console.log('Connection to mongo database Successful!'))
        .catch(err => console.log(err));        
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path')

const app = express();
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Test the first route
// app.get('/', (req, res) => res.send({msg: 'Server works!'}));

// The routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

if(process.env.NODE_ENV === 'production'){
        // Load static folder and run index.html
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}

const port = process.env.PORT || 8010;
// Listening on port
app.listen(port, () => console.log(`Successfully listening on port ${port}`));

// Test Mongodb connection
mongoose.connect(db)
        .then(() => console.log('Connection to db successful'))
        .catch(err => console.log(err));

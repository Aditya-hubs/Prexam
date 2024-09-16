require('dotenv').config();
const connectDB = require('./config/db');
const express = require("express");
const bodyParser = require("body-parser");
const register = require('./routes/register');
const login = require('./routes/login');
const authorize = require('./middleware/middleware');
const subjects = require('./routes/subjects');
const app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth/register', register);
app.use('/api/auth/login', login);
app.use('/api/auth/subjects',authorize,subjects);
app.use(express.static("public"));

connectDB();










const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

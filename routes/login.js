const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Students');

const route = express.Router();

route.post('/', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Find the user by username
        const student = await Student.findOne({ username });
        if (!student) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({id: student._id },process.env.JWT_SECRET,{expiresIn: '1h'});
        console.log(student._id);
        console.log(token);
        res.json({token});
        // res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = route;
// username: Student.username



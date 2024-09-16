// require('dotenv').config();
// const express = require('express');
// const bcrypt = require('bcrypt');
// const Student = require('../models/Students');
// const route = express.Router();

// route.post('/', async (req,res) => {
//     const { username, password } = req.body;
//     try {
//        let Student = await Student.findOne({username});
//        if(Student) {
//         console.log("User already exists");
//         return res.status(400).json({ message: 'User already exists' });
//        }
//        const salt = await bcrypt.genSalt(10);
//        const hash = await bcrypt.hash(password,salt);

//        Student = new Student({
//         username: username,
//         password: hash
//     });


//         await Student.save();
//         return res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = route;



require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Students'); // Ensure the path and name match your model file
const route = express.Router();

route.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            console.log("User already exists");
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new Student
        const newStudent = new Student({
            username: username,
            password: hash
        });

        // Save the new student to the database
        await newStudent.save();
        const token = jwt.sign({id: Student._id,username: Student.username},process.env.JWT_SECRET,{expiresIn: '1h'});
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = route;

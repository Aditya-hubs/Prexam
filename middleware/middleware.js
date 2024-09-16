// const jwt = require('jsonwebtoken');

// const authorize  = (req,res,next) => {
//     const token = req.header('Authorization');
//     if(token === false){
//         return res.status(400).json({message: 'Access denied. No token '});
//     }
//     try {
//         const decode = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET);
//         req.Student = Student.findById(decoded.id);
//         next();
//         } catch (err) {
//             res.status(400).json({message: "Inavalid token"});
//         } 
// };

// module.exports = authorize;


const jwt = require('jsonwebtoken');
const Student = require('../models/Students'); // Ensure Student model is imported

const authorize = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Access denied. No token provided' });
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        console.log(decoded);
        req.student = await Student.findById(decoded.id);
        console.log(req.student);
        if (!req.student) {
            return res.status(404).json({ message: 'User not found at middleware' });
        }
        next();
    } catch (err) {
        console.error('Authorization error:', err);
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authorize;





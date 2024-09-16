const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: String ,
    password: String  ,
    subjects: [
        {
            subject: String,
            syllabus: String,
            Timeleft: Number
        }
    ],
    studyPlan: {
        type: String,  // Change from Object to String to store text-based plan
        default: ""
    }
});

const Student = new mongoose.model("Students", StudentSchema);
module.exports = Student;
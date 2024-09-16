const mongoose = require("mongoose");
const express = require("express");
const Student = require("../models/Students");
const authorize = require("../middleware/middleware");

const route = express.Router();

route.post("/",authorize,async (req,res) => {
    const {subject,syllabus,Timeleft} = req.body;

    try {

        const student = await Student.findOne({_id: req.student.id});
        if(!student){
            return res.status(404).json({message : 'user not found'});
        }
        if (!student.subjects) {
            student.subjects = [];
        }

        student.subjects.push({subject,syllabus,Timeleft});

        await student.save();

        // const modelResponse = await axios.post("http://your-flask-api-url/generate_study_plan", {
        //     subjects: student.subjects // Send the updated subjects array
        // });

        // const studyPlan = modelResponse.data.study_plan;

        // student.studyPlan = studyPlan;
        // await student.save();


        // return res.json({
        //     message: "Subject added and data sent to model",
        //     GeneratedPlan: modelResponse.data  // Return the model's response to the frontend
        // });
        
         
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
});


route.get("/study-plan", authorize, async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.student.id });

        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            studyPlan: student.studyPlan || "No study plan found"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = route;

const express = require('express');
const router = express.Router();
const PioPost = require('../models/pioPost');


router.get("/api", (req, res) => {
    PioPost.find({ }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log('error: ', error);
    });
});

router.post("/save", (req, res) => {
    console.log("body: ", req.body);
    const data = req.body;
    const newPost = new PioPost(data);
    newPost.save((error) => {
        if (error) {
            res.status(500).json({
                msg: "Sorry, internal server error"
            });
        } else {
            res.status(200).json({
                msg: "data was recieved"
            }); 
        }
    })
});


module.exports = router;

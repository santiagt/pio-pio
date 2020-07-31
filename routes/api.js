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
    
    const data = req.body;
    const newPost = new PioPost(data);
    newPost.save((err) => {
        if (err) {
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

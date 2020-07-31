const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./routes/api');


mongoose.connect('mongodb+srv://santiago:MatildaIsabella@cluster0.0m3ye.gcp.mongodb.net/piopio?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to db');
});

// newPost.save((error) => {
//     if (error) {
//         console.log("something went wrong!");
//     } else {
//         console.log('post was save');
//     }

// });

app.use(express.json());
app.use(express.urlencoded());

app.use('/', routes);
app.use = morgan('tiny');



app.listen(PORT, console.log(`Server started at ${PORT}`));
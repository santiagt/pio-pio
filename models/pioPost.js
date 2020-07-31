const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PioPostSchema = new Schema({
    user: String,
    content: String,
    date: {
        type: String,
        default: Date.now()
    }
});

const PioPost = mongoose.model('PioPost', PioPostSchema);

module.exports = PioPost;
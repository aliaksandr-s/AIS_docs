const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: String,
    date: Date,
    status: String,
    url: String
});

mongoose.model('Document', documentSchema);
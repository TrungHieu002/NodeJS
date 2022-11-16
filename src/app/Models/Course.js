const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String},
    description: { type: String},
    image: { type: String},
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now},
    slug: { type:String},
});
module.exports = mongoose.model('Course',Course)
const mongoose = require('mongoose');
const newSchema = mongoose.Schema({
    addNewsType:{type:String,required:true},
    category:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    img:{type:String,required:true},
}, {timestamps:true})

module.exports = mongoose.model('New', newSchema);
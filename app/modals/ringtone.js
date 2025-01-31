const mongoose = require('mongoose');
const ringtoneSchema = mongoose.Schema({
    category:{type:String,required:true},
    title:{type:String,required:true},
    name:{type:String,required:true},
    ring:{type:String,required:true},
}, {timestamps:true})

module.exports = mongoose.model('Ringtone', ringtoneSchema);
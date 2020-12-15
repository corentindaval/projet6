const mongoose=require('mongoose');
const uniquevalidator=require('mongoose-unique-validator');
const { stringify } = require('querystring');


const likeschema=mongoose.Schema({
    userId:{type:String,require:true,unique:true},
    like:{type:Number,require:true},
});

likeschema.plugin(uniquevalidator);

module.exports=mongoose.model('like',likeschema);
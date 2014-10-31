/**
 * Created by AHMER on 10/31/2014.
 */
var mongoose  = require('mongoose');

var User = new mongoose.Schema(
    {
        firstName:{type:String , unique:true},
        lastName:{type:String , unique:true},
        email: { type: String, unique: true, lowercase: true },
        password: String
})/*
var User = mongoose.model('User',userSchema)*/
module.exports = mongoose.model('User', User);
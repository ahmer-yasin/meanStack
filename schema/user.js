/**
 * Created by AHMER on 10/31/2014.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        firstName:{type:String , unique:true},
        lastName:{type:String , unique:true},
        email: { type: String, unique: true, lowercase: true },
        password: String
})/*
var User = mongoose.model('User',userSchema)*/
exports = mongoose.model('User',userSchema);
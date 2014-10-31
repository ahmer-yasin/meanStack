/**
 * Created by AHMER on 10/31/2014.
 */
var User = require('../schema/user');
function isEmail(email){
    var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}
exports.signUp=function(req,res,next){
    if(!req.body.email || !req.body.password) return  res.status(400).json({msg: "Email and Password can't be blank"});
    if (!isEmail(req.body.email)) return res.status(400).json({msg: 'Email is invalid'});
    if (req.body.password.length < 4) return  res.status(400).json({msg: 'Password must be at least 4 characters long'});
    var User = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email:req.body.email},function(err,exit){
        if(err){
            return next(err)
        }
        if(exit){
            return res.status(400).json({msg:'Email is already exists'});
        }
        User.save(function(err){
            if(err){
                return next(err);
            }
            res.status(200).json({msg:'register successfully'})
        })
    })

   /* User.findOne({email:req.body.email}, function(err,exist){
        if(err) return next(err);
        if(exist) return res.status(400).json({msg:'Email is already exist'});
        user.save(function(err){
            if(err) return next(err);
            res.status(200).json({msg:'register successfully'})
        });
    })*/
    }

const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup
router.post('/signup', (req, res, next) => {



 // console.log(isNaN(parseInt(req.body.phone)));
 // check email exists
  User.findOne({ email: req.body.email}).then( data => {
    if(data){
      res.status(201).send({
        success: false,
        message: 'email already exist!!'
      });
    } else {
            //hash password
            if(req.body.password){
              bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err) {
                  console.log(err);
                } else {
                  console.log(hash);
                  //
                  //save signup data in monggose db
                  // create user
                  let user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    phone: parseInt(req.body.phone),
                    password: hash,
                    isSeller: req.body.isSeller
                  });


                  user.save().then( data => {
                    res.status(200).json({
                      data: data,
                      success: true,
                      message: 'Signup is successful!!'
                    });
                  }).catch(err => {
                    res.status(400).json({
                      success: false,
                      message: err
                    });
                  });
                  //
                }
              });
            } else {
              res.status(201).json({
                success: false,
                message: 'Password required!!'
              });
            }


    }
  });
});

//login
router.post('/login', (req, res, next) => {

  //check email or phone
  if(isNaN(Number(req.body.emailPhone))){
    //find by email
    authUser(req, res, 'email');
  }else{
    // find by phone
    authUser(req, res, 'phone');
  }
});


//get profile
router.get('/profile', (req, res, next) =>{

  // verify token auth
  jwt.verify(req.headers.authorization, process.env.secret, (err, decoded) =>{
    if(err){
      res.status(201).json({
        success: false,
        message: err
      });
    } else {
      console.log(decoded);
     User.findOne( { email: decoded.email }).then( result => {
      res.status(200).json({
        data: {
          name: result.name,
          email: result.email,
          phone: result.phone,
          isSeller: result.isSeller
        },
        success: true,
        message: 'login successful!!!'
      });
     });
    }
  });
});

//update profile

router.put('/update', (req, res, next) => {
  // console.log('--------------req-------------');
  // // console.log(req);
  // console.log('-----------headers-----------');
  // console.log(req.headers);
  console.log('-----------body---------------');
  console.log(req.body);
  // console.log('-------------file--------------');
  // console.log(req.file);
  // console.log('-------------routes--------------');
  // console.log(req.route);
  jwt.verify(req.headers.authorization, process.env.secret, (err, decoded) => {
    if(err) {
      res.status(201).json({
        success: false,
        message: err
      });
    } else{
      User.updateOne({ email: decoded.email }, { $set: {isSeller: req.body.isSeller}}).then( result => {
        res.status(200).json({
          data: req.body.isSeller,
          success: true,
          message: 'kfasfas  dsfafas'
        });
      });
    }
  });

});



// check email/ phone & password

function authUser(req, res, message) {
  let check = ( message === 'email') ? { email : req.body.emailPhone } : { phone: req.body.emailPhone} ;
  User.findOne(check).then( data => {
    if(!data){
      res.status(201).json({
        success: false,
        message: 'invalid '+message
      });
    }else {
     console.log(data);
     //check password
     bcrypt.compare(req.body.password, data.password, (err, result) =>{
       if(err){
         console.log(err);
       } else {
         if(!result){
           res.status(201).json({
             success: false,
             message: 'wrong password!!'
           });
         } else {
           let token = jwt.sign(data.toJSON(), process.env.secret, { expiresIn: 60*5 })
           res.status(200).json({
             token: token,
             success: true,
             message: 'login successful!!'
           });
         }
       }
     });
    }
   });
}

module.exports = router;


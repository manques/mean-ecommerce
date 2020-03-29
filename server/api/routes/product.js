const express = require('express');
const path = require('path');
const router =  express.Router();
const multer = require('multer');
const Product = require('../model/product');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './server/product')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString()+ '-' + file.originalname);
  }
});

const upload = multer({ storage: storage, limits: 1024*10248*5 });

router.post('/add-product', upload.single('image'), (req, res, next) => {
  console.log('------------headers------------');
  console.log(req.headers);
  console.log('------------body------------');
  console.log(req.body);
  console.log('------------file------------');
  console.log(req.file);
  jwt.verify(req.body.token, process.env.secret, (err, decoded) =>{
    if(err) {
      res.status(201).json({
        success: false,
        message: err
      });
    } else {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        owner: decoded._id,
        name: req.body.name,
        price: Number(req.body.price),
        category: req.body.category,
        image: `http://localhost:8000/${req.file.path}`,
        stock: Number(req.body.stock),
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        created: new Date(),
        updated: new Date(),
      });

      product.save().then( data => {
        res.json({
          data: data,
          success: true,
          message: 'add-product is succssful!!'
        });
      } );
    }
  });
});

//get owner products list
router.get('/owner-product-list', (req, res, next) =>{
  jwt.verify(req.headers.authorization, process.env.secret, (err, decoded) =>{
    if(err){
      res.status(201).json({
        success: false,
        message: err
      });
    } else {
      Product.find( { owner: decoded._id}).populate('owner').then( result =>{
        res.status(200).json({
          data: result,
          success: true,
          message: 'get data successful!!'
        });
      });
    }
  });
});


module.exports = router;

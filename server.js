const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
mongoose.Promise = global.Promise;
const mkdirp = require('mkdirp');

//mkdir for product
mkdirp(path.join(__dirname, 'server/product')).then( made => {
  console.log(`mode directories ${made}`);
});


// mongoose db connection
mongoose.connect(`mongodb://${process.env.user}:${process.env.secret}@ds053774.mlab.com:53774/mean-ecommerce`,
{useNewUrlParser: true, useUnifiedTopology: true}, () =>{
    console.log('db connected');
});

// cross browser
app.use(cors());

//port
const port = process.env.PORT || 8000;

// parse json & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// morgan
app.use(morgan('dev'));
//  custom routes
// import files
const userRoutes = require('./server/api/routes/user');
const productRoutes = require('./server/api/routes/product.js');
// customing routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);

// error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status(404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


app.listen(port, () =>{
  console.log(`server listen at port ${port}`);
});

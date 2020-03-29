const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  created: { type: Date, default: new Date() },
  updated: { type: Date, default: new Date() }
});


module.exports = mongoose.model('Product', productSchema);

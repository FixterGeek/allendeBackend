const Schema = require('mongoose').Schema

const productSchema = new Schema({
  product_code: String,
  name: String,
  price: String,
  photoURL: String,
  style: String,
  alcohol_percentage: String,
  description: String,
  bitterness: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Product', productSchema)
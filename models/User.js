const Schema = require('mongoose').Schema
const PLM    = require('passport-local-mongoose')

const userSchema = new Schema({
  email: String,
  active: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  token: String,
  phone: String,
  contact_name: String,
  rfc: String,
  business_name: String,
  credit_amount: Number,
  credit_days: Number,
  discount: Number,
  delivery_address_street: String,
  delivery_address_number: String,
  delivery_address_int: String,
  delivery_address_neighborhood: String,
  delivery_address_zip_code: String,
  delivery_address_state: String,
  delivery_address_city: String,
  business_address_street: String,
  business_address_number: String,
  business_address_int: String,
  business_address_neighborhood: String,
  business_address_zip_code: String,
  business_addresss_state: String,
  business_address_city: String,
  comments: String,
  location_zone: Number,
  QR: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('User', userSchema.plugin(PLM, {usernameField: 'email'}))
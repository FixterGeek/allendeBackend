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
  credit_amount: String,
  credit_days: String,
  discount: String,
  address: {
    street: String,
    number: String,
    neighborhood: String,
    zip_code: String,
    state: String,
    city: String
  },
  business_address: String,
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
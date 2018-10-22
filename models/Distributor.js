const Schema = require('mongoose').Schema

const distributorSchema = new Schema({
  email: String,
  active: {
    type: Boolean,
    default: true
  },
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
  business_address_state: String,
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
  }
})

module.exports = require('mongoose').model('Distributor', distributorSchema)
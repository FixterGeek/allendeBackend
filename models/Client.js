const Schema = require('mongoose').Schema

const clientSchema = new Schema({
  rfc: String,
  business_name: String,
  billing_address: {
    street: String,
    number: String,
    neighborhood: String,
    zip_code: String,
    state: String,
    city: String
  },
  delivery_address: {
    street: String,
    number: String,
    neighborhood: String,
    zip_code: String,
    state: String,
    city: String
  },
  location_zone: Number,
  delivery_time: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Client', clientSchema)
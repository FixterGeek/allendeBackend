const Schema = require('mongoose').Schema

const clientSchema = new Schema({
  distributor:{
    type: Schema.Types.ObjectId,
    ref:"Distributor",
    required: true
  },
  rfc: String,
  email: String,
  business_name: {
    type: String,
    required: true
  },
  phone:String,
  business_address_street:String,
  business_address_number: String,
  business_address_int: String,
  business_address_zip_code: String,
  business_address_neighborhood: String,
  business_address_state: String,
  delivery_address: {
    street: String,
    number: String,
    neighborhood: String,
    zip_code: String,
    state: String,
    city: String
  },
  contact_name: String,
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
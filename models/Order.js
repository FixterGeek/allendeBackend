const Schema = require('mongoose').Schema

const orderSchema = new Schema({
  distributor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  order: [
    {
      name_product: String,
      price: Number,
      qty: Number
    }
  ],
  estimated_date: String,
  status: String,
  QR: String,
  bill: String,
  total: Number
})
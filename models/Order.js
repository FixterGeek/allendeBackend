const Schema = require('mongoose').Schema

const orderSchema = new Schema({
  distributor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  arrivalDate:{
    type: Date
  },
  products: {
    type: Array
  },
  status: {
    type: String,
    enum: ["PENDIENTE", "APROVADA","ENVIADA", "ENTREGADA"],
    default: "PENDIENTE"
  },
  payment: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },
  QR: String,
  discount:Number,
  subtotal: Number,
  total: Number
}, {
  timestamps:{
    createdAt:true,
    updatedAt:true
  }
})

module.exports = require('mongoose').model("Order", orderSchema)
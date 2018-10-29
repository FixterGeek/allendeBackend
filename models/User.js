const Schema = require('mongoose').Schema
const PLM    = require('passport-local-mongoose')

const userSchema = new Schema({
  username: String,
  email: String,
  active: {
    type: Boolean,
    default: false
  },
  QR: String,
  distributor:{
    type: Schema.Types.ObjectId,
    ref: "Distributor"
  },
  role:{
    type: String,
    enum: ["ADMIN", "DIST"],
    default:"DIST"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('User', userSchema.plugin(PLM, {usernameField: 'email'}))
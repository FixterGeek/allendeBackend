const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alertSchema = new Schema({
    name: String,
    text: String,
    active: {
        type: Boolean,
        default: false
    },
    tipo: {
        type: String,
        enum: ["SUCCESS","WARNING", "DANGER", "INFO"],
        default: "INFO"
    }
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = mongoose.model("Alert", alertSchema)
const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const customer = mongoose.model('CRM', customerSchema);

module.exports = customer
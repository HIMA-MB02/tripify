//Step 1: Import Mongoose Module
var mongoose= require('mongoose');
var BookingSchema = require('./booking.model').BookingSchema;
//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let CustomerSchema = new Schema({
    customerName: String,
	customerEmail: String,
	customerPassword: String,
	customerAge: Number,
	customerPhone: Number,
	customerGender: String,
	customerIdenification: String,
	customerBookings: []
})

//Step 4: Exporting Schema
var Customer = mongoose.model('Customer',CustomerSchema);

module.exports = {
	Customer: Customer,
	CustomerSchema: CustomerSchema
}

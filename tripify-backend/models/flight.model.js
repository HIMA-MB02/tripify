//Step 1: Import Mongoose Module
var mongoose= require('mongoose');
var CitySchema = require('./city.model').CitySchema;
//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let FlightSchema = new Schema({
    flightName: String,
	flightNumber: String,
	cityFrom: CitySchema,
	cityTo: CitySchema,
	vacantSeats: Number,
	departureDate: Date,  		// Date & Time
	duration: Number,
	seatPrice: Number
})

//Step 4: Exporting Schema
const Flight = mongoose.model('Flight',FlightSchema);

module.exports = {
	Flight: Flight,
	FlightSchema: FlightSchema
}

//Step 1: Import Mongoose Module
var mongoose= require('mongoose');
var CitySchema = require('./city.model').CitySchema;
//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let BusSchema = new Schema({
    busName: String,
	busNumber: String,
	cityFrom: CitySchema,
	cityTo: CitySchema,
	vacantSeats: Number,
	departureDate: Date,  		
	duration: Number,
	seatPrice: Number
})

//Step 4: Exporting Schema
const Bus = mongoose.model('bus',BusSchema);

module.exports = {
	BusSchema: BusSchema,
	Bus: Bus
}

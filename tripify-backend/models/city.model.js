//Step 1: Import Mongoose Module
var mongoose= require('mongoose');
var HotelSchema = require('./hotel.model').HotelSchema;
//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let CitySchema = new Schema({
    cityName: String,
	cityAirport: String,
	cityBusstop: String,
	cityStation: String,
	cityHotels: [HotelSchema]
})

//Step 4: Exporting Schema
const City = mongoose.model('cities', CitySchema);

module.exports = {
	CitySchema: CitySchema,
	City: City
}

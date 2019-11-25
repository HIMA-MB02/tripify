//Step 1: Import Mongoose Module
var mongoose= require('mongoose');
var CitySchema = require('./city.model').CitySchema;
//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let TrainSchema = new Schema({
    trainName: String,
	trainNumber: String,
	cityFrom: CitySchema,
	cityTo: CitySchema,
	vacantSeats: Number,
	departureDate: Date,  		
	duration: Number,
	seatPrice: Number
})

//Step 4: Exporting Schema
const Train = mongoose.model('Train',TrainSchema);

module.exports = {
	Train: Train,
	TrainSchema: TrainSchema
}
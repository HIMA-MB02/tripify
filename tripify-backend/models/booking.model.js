//Step 1: Import Mongoose Module
var mongoose= require('mongoose');

var HotelSchema = require('./hotel.model').HotelSchema;
var TrainSchema = require('./train.model').TrainSchema;

var BusSchema = require('./bus.model').BusSchema;
var FlightSchema = require('./flight.model').FlightSchema;

//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let BookingSchema = new Schema({
		travellerName:String,
		travellerEmail:String,
		travellerAge:Number,
		travellerPhone:Number,
		travellerGender:String,
		travellerIdentification:String,
	    flightBooking: FlightSchema,
		trainBooking: TrainSchema,
		busBooking: BusSchema,
		hotelBooking: HotelSchema,
        totalPrice: Number 		         //[pricePerRoom + seatPrice]
});

//Step 4: Exporting Schema
var Booking = mongoose.model('Booking',BookingSchema);

module.exports = {
	Booking: Booking,
	BookingSchema: BookingSchema
}

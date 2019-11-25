//Step 1: Import Mongoose Module
var mongoose= require('mongoose');

//Step 2: Create Schema Object
const Schema = mongoose.Schema;

//Step 3: Create out Schema with optionally adding Validations
let HotelSchema = new Schema({
    hotelName: String,
    vacantRooms: Number,
	rating: Number,
	pricePerRoom: Number
})

//Step 4: Exporting Schema
const Hotel = mongoose.model('hotel', HotelSchema)
module.exports = {
    HotelSchema: HotelSchema,
    Hotel: Hotel
};

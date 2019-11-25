const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//Dependency for Cross Platform Communication
const cors = require('cors');
//For routes
const routeCity = require('./routes/city.routes');
const routeHotels = require('./routes/hotel.routes');
const routeFlight = require('./routes/flight.routes');
const routeTrain = require('./routes/train.routes');
const routeBus = require('./routes/bus.routes');
const routeCustomers = require('./routes/customer.routes');
const routeBookings = require('./routes/booking.routes');
//Dependencies for Database
const mongoose = require('mongoose');
const config = require('./db/config');
const PORT = process.env.PORT || 4000;

//Initialize connection to Database
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.once('open', function () {
    console.log('Connection Open with MONGODB Server...!');
});
db.on('error', function (err) {
    console.log("Error is: " + err.stack);
});

//Configure Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.use('/cities', routeCity);
app.use('/hotels', routeHotels);
app.use('/flights', routeFlight);
app.use('/trains', routeTrain);
app.use('/buses', routeBus);
app.use('/customers', routeCustomers);
app.use('/bookings', routeBookings);


//Starting the server
app.listen(PORT, function(){
    console.log('Server is started at ' + PORT);
})


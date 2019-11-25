//For Routes
const express = require('express');
//For mongoose Thir Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();

//Filters
let flightFilter = {};

let Flight = require('../models/flight.model').Flight

router.route('/getFilteredFlights').post(function (req, res) {

    console.log(req.body);
    this.flightFilter = {
        cityFrom: req.body.cityFrom,
        cityTo: req.body.cityTo,
        departureDate: req.body.stringDate,
        travellersCount: req.body.travellersCount
    }
    res.redirect('/flights/');
})

//GET ALL---->flight BY Filter
router.route('/').get(function (req, res) {

    Flight.find(function (err, flights) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            tempFlights = [];
            for(let flight of flights) {
                if((flight.departureDate.toJSON().slice(0,10)).toString() === this.flightFilter.departureDate) {
                    if((flight.cityFrom._id == this.flightFilter.cityFrom) && (flight.cityTo._id == this.flightFilter.cityTo)) {
                        if(flight.vacantSeats >= this.flightFilter.travellersCount){
                            tempFlights.push(flight);
                        }
                    }
                }
            }
            flights = tempFlights;
            res.status(200).json({
                flights: flights,
                msg: 'Success!'
            });
        })
});

//Get by id--->flight
router.route('/:id').get(function (req, res) {
    Flight.findById(req.params.id, { __v: 0 },
        function (err, flight) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            res.status(200).json({
                flight: flight,
                msg: 'Success!'
            });
        }
    )
})


//create-->flight
router.route('/').post(function (req, res) {
    var flight = new Flight()
    flight.flightName = req.body.flightName;
    flight.flightNumber = req.body.flightNumber;
    flight.cityFrom = req.body.cityFrom;
    flight.cityTo = req.body.cityTo;
    flight.vacantSeats = req.body.vacantSeats;
    flight.departureDate = req.body.departureDate;
    flight.duration = req.body.duration;
    flight.seatPrice = req.body.seatPrice;


    flight.save(function (err) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        console.log("added");
        res.status(200).json({ message: 'Flight created' });
    })
})


//delete
router.route('/:id')
    .delete(function (req, res) {
        Flight.deleteOne({ _id: req.params.id },
            function (err, flight) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'flight  successfully deleted' });
            })



    });


//update
router.route('/:id')
    .put(function (req, res) {
        Flight.findById(req.params.id, function (err, flight) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            flight.flightName = req.body.flightName;
            flight.flightNumber = req.body.flightNumber;
            flight.cityFrom = req.body.cityFrom;
            flight.cityTo = req.body.cityTo;
            flight.vacantSeats = req.body.vacantSeats;
            flight.departureDate = req.body.departureDate;
            flight.duration = req.body.duration;
            flight.seatPrice = req.body.seatPrice;

            flight.save(function (err) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'flight  successfully updated' });


            })

        })
    })



//Exporting All Routes
module.exports = router;
//For Routes
const express = require('express');
//For mongoose Third Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();

let City = require('../models/city.model').City;
//let Hotel = require('../models/hotel.model');  


//GET ALL---->cities
router.route('/').get(function (req, res) {
    City.find(function (err, city) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({
            city: city,
            msg: 'Success!'
        });;
    })
});

router.route('/getFilteredHotels').post(function(req, res) {
    City.findById(req.body.cityId, { __v: 0 }, function (err, city) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            let cityHotels = [];

            for(hotel of city.cityHotels) {
                if(hotel.vacantRooms >= req.body.roomCount) {
                    cityHotels.push(hotel)
                }
            }

            res.status(200).json({
                cityHotels: cityHotels,
                msg: 'Success!'
            });
        }
    )
})

//Get by id--->city
router.route('/:id').get(function (req, res) {
    City.findById(req.params.id, { __v: 0 },
        function (err, city) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            res.status(200).json({
                city: city,
                msg: 'Success!'
            });
        }
    )
})
//create-->city
router.route('/').post(function (req, res) {
    var city = new City()
    city.cityName = req.body.cityName;
    city.cityAirport = req.body.cityAirport;
    city.cityBusstop = req.body.cityBusstop;
    city.cityStation = req.body.cityStation;
    
    for(let hotel of req.body.cityHotels) 
    {
        city.cityHotels.push(hotel);
    }

    city.save(function (err) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        console.log("added");
        res.status(200).json({ message: 'City created' });
    })
})

//delete
router.route('/:id')
    .delete(function (req, res) {
        City.deleteOne({ _id: req.params.id },
            function (err, city) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: ' successfully deleted' });
            })



    });

//update
router.route('/:id')
    .put(function (req, res) {
        City.findById(req.params.id, function (err, city) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            city.cityName = req.body.cityName;
            city.cityAirport = req.body.cityAirport;
            city.cityBusstop = req.body.cityBusstop;
            city.cityStation = req.body.cityStation;
            city.cityHotels = req.body.cityHotels;


            city.save(function (err) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'city  successfully updated' });


            })

        })
    })



//Exporting All Routes
module.exports = router;
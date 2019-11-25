//For Routes
const express = require('express');
//For mongoose Third Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();
//Importing 
let Booking = require('../models/booking.model').Booking;



//GET ALL---->bookings
router.route('/').get(function (req, res) {
    Booking.find(function (err, bookings) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({
            bookings: bookings,
            msg: 'Success!'
        });
    });
});

//Get by id--->booking
router.route('/:id').get(function (req, res) {
    Booking.findById(req.params.id, { __v: 0 },
        function (err, booking) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            res.status(200).json({
                bookings: bookings,
                msg: 'Success!'
            });
        }
    );
});
//create-->booking
router.route('/').post(function(req,res){
    var booking=new Booking()
    booking.travellerName=req.body.travellerName;
    booking.travellerEmail=req.body.travellerEmail;
    booking.travellerAge=req.body.travellerAge;
    booking.travellerPhone=req.body.travellerPhone;
    booking.travellerGender=req.body.travellerGender;
    booking.travellerIdentification=req.body.travellerIdentification;
    booking.flightBooking=req.body.flightBooking;
    booking.busBooking=req.body.busBooking;
    booking.trainBooking=req.body.trainBooking;
    booking.hotelBooking=req.body.hotelBooking;

    
    
   booking.save(function(err){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        console.log("added");
        res.status(200).json({message:' created'});
    })
})

//delete
router.route('/:id')
.delete(function(req,res){
    Booking.deleteOne({_id:req.params.id},
    function(err,booking){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        res.status(200).json({message:'booking  successfully deleted'});
    })

    

});

//update
router.route('/:id')
.put(function(req,res){
    Booking.findById(req.params.id, function(err,booking){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        booking.travellerName=req.body.travellerName;
        booking.travellerEmail=req.body.travellerEmail;
        booking.travellerAge=req.body.travellerAge;
        booking.travellerPhone=req.body.travellerPhone;
        booking.travellerGender=req.body.travellerGender;
        booking.travellerIdentification=req.body.travellerIdentification;
        booking.flightBooking=req.body.flightBooking;
        booking.busBooking=req.body.busBooking;
        booking.trainBooking=req.body.trainBooking;
        booking.hotelBooking=req.body.hotelBooking;
        
    booking.save(function(err){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({message:'booking  successfully updated'});


    })

    })
})




//Exporting All Routes
module.exports = router;
//For Routes
const express = require('express');
//For mongoose Thir Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();


let Bus = require('../models/bus.model').Bus
let City = require('../models/city.model') 


//GET ALL---->bus


router.route('/getFilteredBuses').post(function (req, res) {
    console.log(req.body);
    this.busFilter = {
        cityFrom: req.body.cityFrom,
        cityTo: req.body.cityTo,
        departureDate: req.body.stringDate,
        travellersCount: req.body.travellersCount
    }
    res.redirect('/buses/');
})


//GET ALL---->bus by filter
router.route('/').get(function(req,res){
    
    Bus.find(function(err,buses){
        if(err){
            res.status(500).json(err.stack);
            return;
        }

         //Filter Buses for given date
         tempBuses = [];
         for (let bus of buses) {
            if ((bus.departureDate.toJSON().slice(0, 10)).toString() === this.busFilter.departureDate) {
                if ((bus.cityFrom._id == this.busFilter.cityFrom) && (bus.cityTo._id == this.busFilter.cityTo)) {
                    if(bus.vacantSeats >= this.busFilter.travellersCount){
                        tempBuses.push(bus);
                    }
                }
            }
        }
        buses=tempBuses;
        res.status(200).json({
            buses: buses,
            msg: 'Success!'
        });
    })
});
//Get by id--->bus
router.route('/:id').get(function(req,res){
    Bus.findById(req.params.id,{__v:0},
        function(err,bus){
            if(err){
                res.status(500).json(err.stack);
            return;
            }
            res.status(200).json(
                {
                    bus: bus,
                    msg: 'Success!'
                    
                }
            );
        }
    )
})

//create-->bus
router.route('/').post(function(req,res){
    var bus=new Bus()
    bus.busName=req.body.busName;
    bus.busNumber=req.body.busNumber;
    bus.cityFrom=req.body.cityFrom;
    bus.cityTo=req.body.cityTo;
    bus.vacantSeats=req.body.vacantSeats;
    bus.departureDate=req.body.departureDate;
    bus.duration=req.body.duration;
    bus.seatPrice=req.body.seatPrice;
    console.log(bus);

    bus.save(function(err){
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
    Bus.deleteOne({_id:req.params.id},
    function(err,bus){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        res.status(200).json({message:'bus  successfully deleted'});
    })

    

});

//update
router.route('/:id')
.put(function(req,res){
    Bus.findById(req.params.id, function(err,bus){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        bus.busName=req.body.busName;
        bus.busNumber=req.body.busNumber;
        bus.cityFrom=req.body.cityFrom;
        bus.cityTo=req.body.cityTo;
        bus.vacantSeats=req.body.vacantSeats;
        bus.departureDate=req.body.departureDate;
        bus.duration=req.body.duration;
        bus.seatPrice=req.body.seatPrice;
        
    bus.save(function(err){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({message:'bus  successfully updated'});


    })

    })
})




//Exporting All Routes
module.exports = router;
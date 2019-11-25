//For Routes
const express = require('express');
//For mongoose Thir Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();
//Importing Course.Model.js

let Hotel = require('../models/hotel.model').Hotel  

//GET ALL---->hotels
router.route('/').get(function(req,res){
    Hotel.find(function(err,hotel){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({
            hotel: hotel,
            msg: 'Success!'
        });
    })
});

//Get by id--->hotel
router.route('/:id').get(function(req,res){
    Hotel.findById(req.params.id,{__v:0},
        function(err,hotel){
            if(err){
                res.status(500).json(err.stack);
            return;
            }
            res.status(200).json({
                hotel: hotel,
                msg: 'Success!'
            });
        }
    )
})


//create-->hotel
router.route('/').post(function(req,res){
    var hotel=new Hotel()
    hotel.hotelName=req.body.hotelName;
    hotel.vacantRooms=req.body.vacantRooms;
    hotel.rating=req.body.rating;
    hotel.pricePerRoom=req.body.pricePerRoom;
   
    hotel.save(function(err){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        console.log("added");
        res.status(200).json({message:'Hotel created'});
    })
})
//delete
router.route('/:id')
.delete(function(req,res){
    Hotel.deleteOne({_id:req.params.id},
    function(err,hotel){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        res.status(200).json({message:' successfully deleted'});
    })

    

});

//update
router.route('/:id')
.put(function(req,res){
    Hotel.findById(req.params.id, function(err,hotel){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        hotel.hotelName=req.body.hotelName;
        hotel.vacantRooms=req.body.vacantRooms;
        hotel.rating=req.body.rating;
        hotel.pricePerRoom=req.body.pricePerRoom;
        
    hotel.save(function(err){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({message:'hotel  successfully updated'});


    })

    })
})

//Exporting All Routes
module.exports = router;
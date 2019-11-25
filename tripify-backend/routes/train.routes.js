//For Routes
const express = require('express');
//For mongoose Third Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();

//Filters
let trainFilter = {};

let Train = require('../models/train.model').Train


router.route('/getFilteredTrains').post(function (req, res) {
    //console.log(req.body);
    this.trainFilter = {
        cityFrom: req.body.cityFrom,
        cityTo: req.body.cityTo,
        departureDate: req.body.stringDate,
        travellersCount: req.body.travellersCount
    }
    res.redirect('/trains/');
})



//GET ALL---->train by filter
router.route('/').get(function(req,res){
    
    Train.find(function(err,trains){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        //Filter Trains for given date
        console.log(trains);
        tempTrains = [];
        for (let train of trains) {
            if ((train.departureDate.toJSON().slice(0, 10)).toString() === this.trainFilter.departureDate) {
                if ((train.cityFrom._id == this.trainFilter.cityFrom) && (train.cityTo._id == this.trainFilter.cityTo)) {
                    if(train.vacantSeats >= this.trainFilter.travellersCount){
                        tempTrains.push(train);
                    }
                }
            }
        }


       trains=tempTrains;
        res.status(200).json({
            trains: trains,
            msg: 'Success!'
        });
    })
});

//Get by id--->train
router.route('/:id').get(function(req,res){
    Train.findById(req.params.id,{__v:0},
        function(err,train){
            if(err){
                res.status(500).json(err.stack);
            return;
            }
            res.status(200).json({
                train: train,
                msg: 'Success!'
            });
        }
    )
})

//create-->train
router.route('/').post(function(req,res){
    var train=new Train()
    train.trainName=req.body.trainName;
    train.trainNumber=req.body.trainNumber;
    train.cityFrom=req.body.cityFrom;
    train.cityTo=req.body.cityTo;
    train.vacantSeats=req.body.vacantSeats;
    train.departureDate=req.body.departureDate;
    train.duration=req.body.duration;
    train.seatPrice=req.body.seatPrice;
    console.log(train);
    train.save(function(err){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        console.log("added");
        res.status(200).json({message:'train created'});
    })
})
//delete
router.route('/:id')
.delete(function(req,res){
    Train.deleteOne({_id:req.params.id},
    function(err,train){
        if(err){
            res.status(500).json(err.stack);
        return;
        }
        res.status(200).json({message:'train  successfully deleted'});
    })

    

});

//update
router.route('/:id')
.put(function(req,res){
    Train.findById(req.params.id, function(err,train){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        train.trainName=req.body.trainName;
        train.trainNumber=req.body.trainNumber;
        train.cityFrom=req.body.cityFrom;
        train.cityTo=req.body.cityTo;
        train.vacantSeats=req.body.vacantSeats;
        train.departureDate=req.body.departureDate;
        train.duration=req.body.duration;
        train.seatPrice=req.body.seatPrice;
        
    train.save(function(err){
        if(err){
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({message:'train  successfully updated'});


    })

    })
})




//Exporting All Routes
module.exports = router;
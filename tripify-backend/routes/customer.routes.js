//For Routes
const express = require('express');
//For mongoose Third Party Module
const mongoose = require('mongoose');
//for Connection string
const config = require('../db/config');
//Configuring Router == router in router.js
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
//Importing Course.Model.js
let Flight = require('../models/flight.model').Flight
let Bus = require('../models/bus.model').Bus
let Hotel = require('../models/hotel.model').Hotel  
let City = require('../models/city.model').City;
let Train = require('../models/train.model').Train
const nodemailer = require('nodemailer');
let Customer = require('../models/customer.model').Customer

//GET ALL---->customers
router.route('/').get(function (req, res) {
    Customer.find(function (err, customer) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({
            customer: customer,
            msg: 'Success!'
        });
    })
});

//Get by id--->customers
router.route('/:id').get(function (req, res) {
    Customer.findById(req.params.id, { __v: 0 },
        function (err, customer) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            res.status(200).json({
                customer: customer,
                msg: 'Success!'
            });
        }
    )
})
//create-->customer
router.route('/').post(function (req, res) {
    var customer = new Customer()
    customer.customerName = req.body.customerName;
    customer.customerEmail = req.body.customerEmail;
    customer.customerAge = req.body.customerAge;
    customer.customerPhone = req.body.customerPhone;
    customer.customerGender = req.body.customerGender;
    customer.customerIdentification = req.body.customerIdentification;
    customer.customerBookings = [];

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(req.body.customerPassword, salt,null, function (err, hash) {
            if (err) {
                return next(err);
            }
           
            customer.customerPassword = hash;
            console.log(customer.customerPassword);
            customer.save(function (err) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            console.log("added");
            res.status(200).json({ message: 'created' });
        })

        });
    });
   
})
//delete
router.route('/:id')
    .delete(function (req, res) {
        Customer.deleteOne({ _id: req.params.id },
            function (err, customer) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'customer  successfully deleted' });
            })



    });

//update
router.route('/:id')
    .put(function (req, res) {
        Customer.findById(req.params.id, function (err, customer) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }
            customer.customerName = req.body.customerName;
            customer.customerEmail = req.body.customerEmail;
            customer.customerAge = req.body.customerAge;
            customer.customerPhone = req.body.customerPhone;
            customer.customerGender = req.body.customerGender;
            customer.customerIdentification = req.body.customerIdentification;
            customer.customerPassword = req.body.customerPassword;
            customer.customerBookings = [];

            customer.save(function (err) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'customer  successfully updated' });


            })

        })
    })

router.route('/sendBookingEmail').post(function (req, res) {
    console.log(req.body);
    let customerName = req.body.customer.customerName;
    const query = { customerEmail: req.body.customer.customerEmail };
    Customer.findOne(query, function (err, customer) {
        if (err) {
            res.status(404).json({
                message: 'Customer not found in database!'
            })
        }
        let bookingsToMail = {}
        let travellersCount = 0;
        for (booking of customer.customerBookings) {
            if (booking.bookingID == req.body.details.bookingID) {
                if (travellersCount == 0) {
                    bookingsToMail = booking;
                }
                travellersCount++;
            }
        }

        let ticketBody;
        switch (bookingsToMail.bookingType) {
            case 'flight':
                ticketBody = `<table>
                <tr>
                    <th>
                        Booking ID
                    </th>
                    <td>
                        ${req.body.details.bookingID}
                    </td>
                    <th>
                        Departure
                    </th>
                    <td>
                        ${bookingsToMail.flightBooking.departureDate.slice(0, 10)} at ${bookingsToMail.flightBooking.departureDate.slice(11, 16)}
                    </td>
                </tr> 
                <tr>
                    <th>
                        Flight Name:
                    </th>
                    <td>
                    ${bookingsToMail.flightBooking.flightName}
                    </td>
                    <th>
                        Flight Number:
                    </th>
                    <td>
                    ${bookingsToMail.flightBooking.flightNumber}
                    </td>
                </tr>
                <tr>
                 <th>
                     From:
                 </th>
                 <td>
                    ${bookingsToMail.flightBooking.cityFrom.cityName}
                 </td>
                 <th>
                     To:
                 </th>
                 <td>
                    ${bookingsToMail.flightBooking.cityTo.cityName}
                 </td>
             </tr>
                <tr>
                    <th>
                        Total Amount:
                    </th>
                    <td>
                        Rs. ${req.body.details.totalAmount}
                    </td>
                    <th>
                        No. of Tickets:
                    </th>
                    <td>
                        ${travellersCount}
                    </td>
                </tr>
             </table>`
                break;
            case 'train':
                ticketBody = `<table>
                    <tr>
                        <th>
                            Booking ID
                        </th>
                        <td>
                            ${req.body.details.bookingID}
                        </td>
                        <th>
                            Departure
                        </th>
                        <td>
                            ${bookingsToMail.trainBooking.departureDate.slice(0, 10)} at ${bookingsToMail.trainBooking.departureDate.slice(11, 16)}
                        </td>
                    </tr> 
                    <tr>
                        <th>
                        Train Name:
                        </th>
                        <td>
                        ${bookingsToMail.trainBooking.trainName}
                        </td>
                        <th>
                        Train Number:
                        </th>
                        <td>
                        ${bookingsToMail.trainBooking.trainNumber}
                        </td>
                    </tr>
                    <tr>
                     <th>
                         From:
                     </th>
                     <td>
                        ${bookingsToMail.trainBooking.cityFrom.cityName}
                     </td>
                     <th>
                         To:
                     </th>
                     <td>
                        ${bookingsToMail.trainBooking.cityTo.cityName}
                     </td>
                 </tr>
                    <tr>
                        <th>
                            Total Amount:
                        </th>
                        <td>
                            Rs. ${req.body.details.totalAmount}
                        </td>
                        <th>
                            No. of Tickets:
                        </th>
                        <td>
                            ${travellersCount}
                        </td>
                    </tr>
                 </table>`
                break;
            case 'bus':
                ticketBody = `<table>
                    <tr>
                        <th>
                            Booking ID
                        </th>
                        <td>
                            ${req.body.details.bookingID}
                        </td>
                        <th>
                            Departure
                        </th>
                        <td>
                            ${bookingsToMail.busBooking.departureDate.slice(0, 10)} at ${bookingsToMail.busBooking.departureDate.slice(11, 16)}
                        </td>
                    </tr> 
                    <tr>
                        <th>
                        Bus Name:
                        </th>
                        <td>
                        ${bookingsToMail.busBooking.busName}
                        </td>
                        <th>
                        Bus Number:
                        </th>
                        <td>
                        ${bookingsToMail.busBooking.busNumber}
                        </td>
                    </tr>
                    <tr>
                     <th>
                         From:
                     </th>
                     <td>
                        ${bookingsToMail.busBooking.cityFrom.cityName}
                     </td>
                     <th>
                         To:
                     </th>
                     <td>
                        ${bookingsToMail.busBooking.cityTo.cityName}
                     </td>
                 </tr>
                    <tr>
                        <th>
                            Total Amount:
                        </th>
                        <td>
                            Rs. ${req.body.details.totalAmount}
                        </td>
                        <th>
                            No. of Tickets:
                        </th>
                        <td>
                            ${travellersCount}
                        </td>
                    </tr>
                 </table>`
                break;
        }

        let emailBody = `
        <b>Ticket Confirmation </b>
        <hr/>
        
            Dear ${customerName},<br /><br />
        
           Congratulations! Thank you for using Tripify's online booking facility. <br />
            Your booking details are indicated below: <br /><br /><br />
            ${ticketBody}
            <br /><br /><br />
            Regards and Thanks<br />
            Team Tripify<br /><br />

            <hr/>
            This is a system generated mail. Plese do not reply to this email ID. (1) Call our 24-hour
            Customeer Care (2) Email Us at care@tripify.co.in
            <hr/>
            `



        let emailAccount = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'himanshu.ganpa@gmail.com',
                pass: 'Appleipad8'
            }
        });

        emailAccount.sendMail({
            from: 'himanshu.ganpa@gmail.com', // sender address
            to: req.body.customer.customerEmail, // Array of recievers
            subject: "Ticket Confirmation on TRIPIFY!", // Subject line
            html: emailBody
        }, (error, info) => {
            if (error) {
                res.status(500).json(error);
            }

            console.log("email has been sent");
            res.status(200).json({
                message: 'Email Successfully Sent'
            })
        });


    });

});
router.route('/hasCompletedForms').post(function (req, res) {
    let email = req.body.email;
    let bookingID = req.body.bookingID;
    let travellersCount = req.body.travellersCount;
    const query = { customerEmail: email };
    Customer.findOne(query, function (err, customer) {
        if (err) {
            res.status(404).json({
                message: 'Customer not found in database!'
            })
        }
        let count = 0;
        console.log(bookingID);
        for (booking of customer.customerBookings) {
            if (booking.bookingID == bookingID) {
                count++;
            }
        }

        console.log(count);
        console.log(travellersCount)
        if (count == travellersCount) {
            res.status(200).json({
                success: true,
                message: 'All Travellers Added'
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'Not All Forms have been filled yet'
            })
        }

    });

})
router.route('/addBooking').post(function (req, res) {
    console.log(req.body);
    let details = req.body.bookingDetails;
    const query = { customerEmail: req.body.email };
    Customer.findOne(query, function (err, customer) {
        if (err) {
            res.status(404).json({
                message: 'Customer not found in database!'
            })
        }
        customer.customerBookings.push(details)
        let queryDB;
        switch(details.bookingType)  {
            case 'flight':
                queryDB = { flightName: details.flightBooking.flightName, flightNumber: details.flightBooking.flightNumber, departureDate: details.flightBooking.departureDate };
                Flight.findOne(queryDB, function(err, flight) {
                    if(err){
                        res.status(404).json({
                            message: 'Flight not found in database!'
                        })
                    }
                        let vacantSeats = flight.vacantSeats;
                        vacantSeats = vacantSeats - 1;
                        flight.vacantSeats = vacantSeats;
                        flight.save(function (err) {

                            if (err) {
                                res.status(500).json(err.stack);
                                return;
                            }
                        })
                })
                break;
            case 'train':
                    queryDB = { trainName: details.trainBooking.trainName, trainNumber: details.trainBooking.trainNumber, departureDate: details.trainBooking.departureDate };

                    Train.findOne(queryDB, function(err, train) {
                        if(err){
                            res.status(404).json({
                                message: 'Train not found in database!'
                            })
                        }
                            let vacantSeats = train.vacantSeats;
                            vacantSeats = vacantSeats - 1;
                            train.vacantSeats = vacantSeats;
                            train.save(function (err) {
                                if (err) {
                                    res.status(500).json(err.stack);
                                    return;
                                }
                            })
                    })
                break;
            case 'bus':
                    queryDB = { busName: details.busBooking.busName, busNumber: details.busBooking.busNumber, departureDate: details.busBooking.departureDate };
                    Bus.findOne(queryDB, function(err, bus) {
                        if(err){
                            res.status(404).json({
                                message: 'Flight not found in database!'
                            })
                        }
                            let vacantSeats = bus.vacantSeats;
                            vacantSeats = vacantSeats - 1;
                            bus.vacantSeats = vacantSeats;
                            bus.save(function (err) {
                                if (err) {
                                    res.status(500).json(err.stack);
                                    return;
                                }
                            })
                    })
                break;
            case 'hotel':
                break;
        }
        customer.save(function (err) {
            if (err) {
                res.status(500).json(err.stack);
                return;
            }

            res.status(200).json({ message: 'customer successfully updated', success: true });
        })

    });
})

router.route('/login').post(function (req, res) {
    let customerEmail = req.body.email;
    let customerPassword = req.body.password;
    const query = { customerEmail: customerEmail };
    console.log(customerEmail)
    Customer.findOne(query, function (err, customer) {
        if (err) {
            res.status(404).json({
                message: 'Customer not found in database!'
            })
        }
        bcrypt.compare(customerPassword, customer.customerPassword, function (err, result) {
            if (result == true) {
                let customerToSend = {
                    customerName: customer.customerName,
                    customerEmail: customer.customerEmail,
                    customerAge: customer.customerAge,
                    customerPhone: customer.customerPhone,
                    customerGender: customer.customerGender,
                    customerIdentification: customer.customerIdenification
                }
                res.status(200).json({
                    customer: customerToSend,
                    message: 'Customer has been authenticated!'
                })
            } else {
                res.status(404).json({
                    message: 'Incorrect Credentials!'
                })
            }
        });


    });
})

router.route('/changePassword').post(function(req, res) {
    console.log(req.body);
    const query = { customerEmail: req.body.customerEmail };
    Customer.findOne(query, function (err, customer) {
        if (err) {
            res.status(404).json({
                message: 'Customer not found in database!'
            })
        }

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(req.body.customerPassword, salt,null, function (err, hash) {
                if (err) {
                    return next(err);
                }
               
                customer.customerPassword = hash;
                console.log(customer.customerPassword);
                customer.save(function (err) {
                    if (err) {
                        res.status(500).json(err.stack);
                        return;
                    }
                    console.log("added");
                    res.status(200).json({ message: 'created' });
                })
    
            });
        });
    });
})
router.route('/prepareAndSendOTP').post(function (req, res) {

    //Preparing the Email and OTP
    let customerEmail = req.body.email;
    let customerFirstName = req.body.name;

    let OTP = (Math.random().toString(36).substring(7)).toUpperCase();

    let emailBody = `
    Dear ${customerFirstName},<br /><br />

    Greetings from Tripify! Hope you have a great holiday! <br />
    Your OTP to register on TRIPIFY is: <b>${OTP}</b><br />
    Please verify before the end of today!<br /><br />
    
    Regards and Thanks<br />
    Team Tripify<br />
    `

    //Configure SMTP Server
    let emailAccount = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'himanshu.ganpa@gmail.com',
            pass: 'Appleipad8'
        }
    });

    emailAccount.sendMail({
        from: 'himanshu.ganpa@gmail.com', // sender address
        to: customerEmail, // Array of recievers
        subject: "OTP to Register on Tripify!", // Subject line
        html: emailBody
    }, (error, info) => {
        if (error) {
            res.status(500).json(error);
        }

        console.log("email has been sent");
        res.status(200).json({
            message: 'Email Successfully Sent',
            OTP: OTP
        })
    });

})

//Exporting All Routes
module.exports = router;
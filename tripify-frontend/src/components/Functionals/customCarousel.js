import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import Flight from '../../../src/carousal_images/flight.jpg';
import Bus from '../../../src/carousal_images/bus.png';
import Train from '../../../src/carousal_images/train.png';
import City1 from '../../carousal_images/city1.png';
import City2 from '../../carousal_images/city2.png';
import City3 from '../../carousal_images/city3.png';
import Hotel1 from '../../carousal_images/hotel1.png';
import Hotel2 from '../../carousal_images/hotel2.png';
import Hotel3 from '../../carousal_images/hotel3.png';
import '../../../src/App.css';

export default class CustomCarousel extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>

                <br />
                <h1 className='text-center'><b>Super Offers</b></h1>
                <div className="container">

                    <div className="row">

                        <div className="col-lg-12">

                            <div id="imageCarousel" className="carousel slide" data-interval="2000"
                                data-ride="carousel" data-pause="hover" data-wrap="true">

                                <ol className="carousel-indicators">
                                    <li data-target="#imageCarousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#imageCarousel" data-slide-to="1"></li>
                                    <li data-target="#imageCarousel" data-slide-to="2"></li>
                                </ol>

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-lg-4">
                                            
                                                <Card className="cardSize">
                                                    <Image src={Train} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Get up to Rs.50 OFF on Train Tickets</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Up to ₹50 OFF Using Wallet Reward Bonus 
</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                        No IRCTC Charges
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupon Code : NOT REQUIRED
      </a>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                            <div className="col-lg-4">
                                                {/* <img src="Images/Jellyfish.jpg" className="img-responsive"> */}
                                                {/* <div className="carousel-caption">
                                        <h3>Jellyfish</h3>
                                        <p>Jellyfish Image Description</p>
                                    </div> */}
                                                <Card className="cardSize">
                                                    <Image src={Flight} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Instant discount on All Flights</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Exclusively on HSBC Credit Cards</span>
                                                        </Card.Meta>
                                                        <Card.Description><br />
                                                        This offer is valid from 1st Oct'19 to 31st Dec'19
                                                        
                                                      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupon Code : HSBCDOM
      </a>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                            <div className="col-lg-4">
                                                {/* <img src="Images/Penguins.jpg" className="img-responsive"> */}
                                                {/* <div className="carousel-caption">
                                        <h3>Penguins</h3>
                                        <p>Penguins Image Description</p>
                                    </div> */}
                                                <Card className="cardSize">
                                                    <Image src={Bus} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Save up to Rs.450 on Bus Tickets</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Up to Rs.300 Instant Discount </span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                        Offer expires on 30th November 2019
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupon Code : BUSPAY
      </a>
                                                    </Card.Content>
                                                </Card>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                {/* <img src="Images/Lighthouse.jpg" className="img-responsive"> */}
                                                {/* <div className="carousel-caption">
                                        <h3>Lighthouse</h3>
                                        <p>Lighthouse Image Description</p>
                                    </div> */}
                                                <Card className="cardSize">
                                                    <Image src={City2} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Explore Manali</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Under Rs. 25,000</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                            Book your flight now.
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupen Code: BOOKMANALI
      </a>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                            <div className="col-lg-4">
                                                {/* <img src="Images/Hydrangeas.jpg" className="img-responsive"> */}
                                                {/* <div className="carousel-caption">
                                                    <h3>Hydrangeas</h3>
                                                    <p>Hydrangeas Image Description</p>
                                                </div> */}
                                                <Card className="cardSize">
                                                    <Image src={City1} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Explore Rann of Kutch</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Under Rs. 15,000</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                        Book Now
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupen Code: BOOKNOW
      </a>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                            <div className="col-lg-4">
                                               
                                                <Card className="cardSize">
                                                    <Image src={City3} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Explore Rajasthan</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Under Rs. 10,000</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                            Hurry! Limited Offer!
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupen Code: HURRYNOW
      </a>
                                                    </Card.Content>
                                                </Card>
                                                <br />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                {/* <img src="Images/tulips.jpg" className="img-responsive"> */}
                                                {/* <div className="carousel-caption">
                                                    <h3>Tulips</h3>
                                                    <p>Tulips Image Description</p>
                                                </div> */}
                                                <Card className="cardSize">
                                                    <Image src={Hotel1} wrapped ui={false} />
                                                    <Card.Content>
                                                        
                                                        <Card.Header> Fairfield by Marriott. </Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Earn INR 500 credit per night on booking</span>
                                                        </Card.Meta>
                                                        <Card.Description><br />
                                                        It’s On Us!
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupen Code: YAYMARRIOT
      </a>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                            <div className="col-lg-4">
                                                <Card className="cardSize">
                                                    <Image src={Hotel2} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Complimentary Room Upgrades </Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Upto 20% Off</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                        Booking Dates: 29th Oct to 20th Dec
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupen Code: ENJOYTRIP
      </a>
                                                    </Card.Content>
                                                </Card>
                                            </div>
                                            <div className="col-lg-4">
                                                <Card className="cardSize">
                                                    <Image src={Hotel3} wrapped ui={false} />
                                                    <Card.Content>
                                                        <Card.Header>Hotels and more in Goa</Card.Header>
                                                        <Card.Meta>
                                                            <span className='date'>Cabo Cabana Wooden Cottages</span>
                                                        </Card.Meta>
                                                        <Card.Description>
                                                            Book Now!
      </Card.Description>
                                                    </Card.Content>
                                                    <Card.Content extra>
                                                        <a>
                                                            <Icon name='tags' />
                                                            Coupen Code: GOAYAY
      </a>
                                                    </Card.Content>
                                                </Card>
                                                <br />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#imageCarousel" className="carousel-control left" data-slide="prev">
                                    <span className="glyphicon glyphicon-chevron-left"></span>
                                </a>
                                <a href="#imageCarousel" className="carousel-control right" data-slide="next">
                                    <span className="glyphicon glyphicon-chevron-right"></span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js">
    </script>
    <script src="bootstrap/js/bootstrap.min.js"></script> */}
            </div>
        )
    }
}
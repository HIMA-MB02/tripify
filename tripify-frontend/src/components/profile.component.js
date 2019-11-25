import React, { Profiler } from 'react'
import { Card, Icon, Image, Grid, Column, Table } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import './profile.component.css';
import user from '../../src/images.jpeg'
// import ImageUploader from 'react-images-upload';
import '../App.css';
import NavBar from './navbar.component';

class Profile extends React.Component {

    constructor(props) {
        super(props);
         this.state = { pictures: [], customer: JSON.parse(localStorage.getItem('customer')) };
         this.onDrop = this.onDrop.bind(this);

    }

    componentDidMount()  {
        console.log(this.state.customer)
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    render() {
        return (
            <div>
                <NavBar/>

            <Grid className="background">
                {/* <NavBar /> */}
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>

                    <Grid.Column width={4}>
                        {/* User image and details card */}
                        <Card style={{ padding: '20px' }}>
                            <Image alt="Upload User Image" src={user} wrapped />
                            <Card.Content className="text-center">
                                <Card.Header>{this.state.customer.customerName}</Card.Header>
                                <Card.Meta>
                                    <span>PERSONAL PROFILE</span>
                                </Card.Meta>
                                <br />
                            </Card.Content>
                           
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={10}>

                {/* Profile Card */}
                         <Card style={{width:'100%'}}>
                            <Card.Content>
                                <Card.Header>PROFILE</Card.Header>
                                <Card.Description>
                                    Basic info, for a faster booking experience
                                </Card.Description>
                                <br />
                                <br />

                                <div className="row fontWeight">
                                    <div className="col-lg-4">Name:</div>
                                    <div className="col-lg-4">{this.state.customer.customerName}</div>
                                </div>
                                <hr />
                                <div className="row fontWeight">
                                    <div className="col-lg-4">Gender:</div>
                                    <div className="col-lg-4">{this.state.customer.customerGender}</div>
                                </div>
                                <hr/>
                                <div className="row fontWeight">
                                    <div className="col-lg-4">Age:</div>
                                    <div className="col-lg-4">{this.state.customer.customerAge}</div>
                                </div>
                            </Card.Content>
                        </Card>
                            
                              {/* Login Card */}
                        <Card style={{width:'100%'}}>
                            <Card.Content>
                                <Card.Header>LOGIN DETAILS</Card.Header>
                                <br/>
                                <Card.Description>
                                Manage your email address, mobile number and password                              
                                  </Card.Description>
                                <br />
                                <br />

                                <div className="row fontWeight">
                                    <div className="col-lg-4">Mobile Number:</div>
                                    <div className="col-lg-4">{this.state.customer.customerPhone}</div>
                                </div>
                                <hr />
                                <div className="row fontWeight">
                                    <div className="col-lg-4">Email:</div>
                                    <div className="col-lg-4">{this.state.customer.customerEmail}</div>
                                </div>
                                <hr/>
                                <div className="row fontWeight">
                                    <div className="col-lg-4">Password:</div>
                                    <div className="col-lg-4">*******</div>
                                </div>
                          </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>

                </Grid.Row>
            </Grid>
            </div>
        )
    }
}

export default Profile;

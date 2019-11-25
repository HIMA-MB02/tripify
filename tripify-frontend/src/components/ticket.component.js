import React, { Component } from 'react';
import {
    Container, Grid, Header, Icon, Image, Menu, Divider,
    Segment, Sidebar, Card, Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default class Ticket extends React.Component {
    render() {
        return (
            <div className="background">
                <br/>
                <Container>
            <Card style={{ width: '60%', paddingLeft: '1%', paddingRight: '1%', paddingTop: '2%', 
                paddingBottom: '2%', textAlign: 'left', backgroundColor: 'rgb(202, 199, 246)' }}>
                <Container>
                    <Segment style={{backgroundColor: 'black', color: 'white'}}>
                    <Card.Header as='h3' 
                        // style={{backgroundColor: 'black', color: 'white'}}
                    >
                        <Icon name='plane'/>
                        Flight Ticket    
                        <Link to='/'>
                    <span style={{float: 'right'}}>
                        TRIPify
                    </span>
                    </Link>
                    </Card.Header>
                    </Segment>
                    <hr />
                    <div style={{float: 'right', opacity: '1'}}>
                        <h1><b><Icon rotated='clockwise' name='barcode'/></b></h1>
                    </div>
                    
                    <Card.Content>
                        <h5>NAME  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                        Himanshu </h5>
                    <Grid columns={4} style={{ paddingLeft: '2%', alignItems: 'center' }}>
                        <Grid.Row >
                            <Grid.Column>
                                <p>FROM</p>
                                <p>FLIGHT</p>
                                <p>BOARDING TIME</p>
                                <p>SEQUENCE #</p>
                                <p>GATE #</p>
                            </Grid.Column> 
                            {/* values */}
                            <Grid.Column>
                                <p>FROM</p>
                                <p>FLIGHT</p>
                                <p>BOARDING TIME</p>
                                <p>SEQUENCE #</p>
                                <p>GATE #</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>TO</p>
                                <p>DATE</p>
                                <p>DEPARTURE TIME</p>
                                <p>CLASS</p>
                                <p>SEAT NUMBER</p>
                            </Grid.Column>
                            {/* VALUES */}
                            <Grid.Column>
                                <p>TO</p>
                                <p>DATE</p>
                                <p>DEPARTURE TIME</p>
                                <p>CLASS</p>
                                <p>SEAT NUMBER</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Message style={{backgroundColor: 'rgb(202, 199, 246)'}}>
                    <p>- Thank you for booking through TRIPify today. </p>
                    <p>- Please be at your departure point 
                        at the indicated boarding time. </p>
                    <p>- Have a pleasant journey.</p>
                    </Message>
                        </Card.Content>
                </Container>                
            </Card>
            </Container>
            <br />
            <Container>
                <h6><b><Icon name='circle outline' /> Choose amongst best of the hotels. Click <Link to='/'>here</Link>.</b></h6>
                <h6><b><Icon name='circle outline' /> Book return trip to avoid last-minute hassle. Click <Link to='/'>here</Link>.</b></h6>
                <h6><b><Icon name='circle outline' /> Back to <Link to='/'>home</Link>.</b></h6>
            </Container>
            </div>
        )
    }
}
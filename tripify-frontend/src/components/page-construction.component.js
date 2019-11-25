import React from 'react'
import { Grid, Header, Segment, Container, Select, Icon }
    from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PageConstruction extends React.Component {
    render() {
        return (
            <div className="background">
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment stacked>
                    <Link to='/'>
                            <Icon link name='close' />
                        </Link>
                        <div textAlign='center'>
                        <img src='images/pageConstruction.png' />
                        </div>
                        <Header as='h2' textAlign='center' style={{color: 'rgb(90, 78, 255)'}}>
                            Page Under Construction
                    </Header>
                    {/* <Container> */}
                    <p>Stay Tuned. This feature will be available soon. </p>
                    <h3  style={{color: 'rgb(90, 78, 255)'}}><Icon loading inverted color='blue'  name='spinner' /></h3>
                    {/* </Container> */}
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
        )
    }
}
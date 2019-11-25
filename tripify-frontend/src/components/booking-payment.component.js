import React, { Component } from 'react';
import { Container, Grid, Card, Icon, Select, Menu, Form, Radio } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import DatePicker from "react-datepicker";
import '../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from './navbar.component';
import Swal from "sweetalert2";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));


export default function BookingPayment(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const setPaymentValue = () => {
        let customer = JSON.parse(localStorage.getItem('customer'));
        axios.post('http://localhost:4000/customers/sendBookingEmail', {details: props.location.state, customer: customer}).then(response => {
           //INSERT ALERT HERE!
           alert('payment successful!');
           Swal.fire({
            title: 'Hurray...',
            text: "Payment successful!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: 'rgb(126, 117, 250)',
            confirmButtonText: 'Ok'
        })
          props.history.push('/ticket');
           
        }).catch(function (error) {
            console.log(error);
        })
        
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <NavBar />
        <div className="background">
            <Menu divided style={{ backgroundColor: 'black' }}>
                <Menu.Item style={{ color: 'white' }}>
                    Tripify
                    </Menu.Item>
                <Menu.Item style={{ color: 'white' }}>
                    1. REVIEW > 2. ENTER DETAILS > 3. PAY SECURELY
                    </Menu.Item>
                <Menu.Item style={{ color: 'white' }}>
                    <p class="small">Secure Payment</p>
                </Menu.Item>
                <Menu.Item style={{ color: 'white' }}>
                    <p class="small"> 10 Million+ Transactions</p>
                </Menu.Item>
                <Menu.Item style={{ color: 'white' }}>
                    <p class="small">256 Bit Encryption</p>
                </Menu.Item>
            </Menu>
            <Grid style={{ paddingLeft: '2%' }}>
                <Grid.Row>
                <Grid.Column width={3}> </Grid.Column>
                    {/* Payment Options */}
                    <Grid.Column width={10}>
                        <h3>Payment Options</h3>
                        <Card style={{ width: '100%' }}>
                            <Card.Content>
                                <div className={classes.root}>
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs example"
                                        className={classes.tabs}
                                    >
                                        <Tab label="Net Banking" {...a11yProps(0)} />
                                        <Tab label="Credit/ Debit Cards" {...a11yProps(1)} />
                                        <Tab label="UPI Payment" {...a11yProps(2)} />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                        <Form>
                                            <Form.Field>
                                                <Card style={{ width: '200px', paddingTop: '3%', paddingBottom: '2%', paddingLeft: '2%', paddingLeft: '2%' }}>
                                                    <Radio
                                                        label='State Bank of India'
                                                        value='sbi'
                                                    // checked={this.state.value === 'sbi'}
                                                    // onChange={this.handleChange}
                                                    />
                                                </Card>
                                            </Form.Field>
                                            <Form.Field>
                                                <Card style={{ width: '200px', paddingTop: '3%', paddingBottom: '2%', paddingLeft: '2%', paddingLeft: '2%' }}>
                                                    <Radio
                                                        label='Bank of India'
                                                        value='boi'
                                                    // checked={this.state.value === 'sbi'}
                                                    // onChange={this.handleChange}
                                                    />
                                                </Card>
                                            </Form.Field>
                                            <Form.Field>
                                                <Select placeholder='Other Banks'
                                                // options={bankOptions} 
                                                />
                                            </Form.Field>
                                        </Form>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Form>
                                            <Form.Group unstackable widths={2}>
                                                <Form.Input label='CARD NUMBER' placeholder='Enter card number here' />
                                                <Form.Input label='NAME ON THE CARD' placeholder='Enter card name here' />
                                            </Form.Group>
                                            <Form.Group unstackable widths={2}>
                                                <Form.Input label='EXPIRY DATE' placeholder='MM/YY' />
                                                <Form.Input label='CVV Code' placeholder='CVV' />
                                            </Form.Group>
                                            <Form.Checkbox label='Save your card details for faster checkout. CVV is not saved.' />
                                        </Form>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Form>

                                            <Form.Group unstackable widths={1}>
                                                <Form.Input label='Enter VPA' placeholder='username@bank' />

                                            </Form.Group>
                                            <br />
                                            <p><Icon name='circle thin' />You must have a Virtual Payment Address</p>
                                            <p><Icon name='circle thin' />Receive payment request on bank app</p>
                                            <p><Icon name='circle thin' />Authorize payment request</p>
                                        </Form>
                                    </TabPanel>
                                    <br />
                                </div>
                                {/* <Grid style={{ paddingLeft: '2%' }}>
                                    <Grid.Row>
                                        <Grid.Column width={4}>
                                            <img src="https://img.icons8.com/color/48/000000/paytm.png" />
                                            <img src="https://img.icons8.com/color/48/000000/bank-cards.png" />
                                        </Grid.Column>
                                        <Grid.Column width={12}></Grid.Column>
                                    </Grid.Row>
                                </Grid> */}

                                <span style={{ float: 'right' }}>
                                    <Typography>
                                        <h2><Icon name='rupee' />
                                        <NumberFormat value={props.location.state.totalAmount} displayType={'text'}
                                                    thousandSeparator={true} thousandsGroupStyle='lakh' />
                                        </h2>
                                        <p><i>Including all taxes</i></p>
                                    </Typography>
                                    <Button
                                    onClick={setPaymentValue}
                                        type="submit"
                                        style={{ width: '200px' }}
                                        variant="contained"
                                        size="huge"
                                    ><h3 className="text-white">MAKE PAYMENT</h3></Button>
                                </span>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
            </div>
        </div>
    );
}


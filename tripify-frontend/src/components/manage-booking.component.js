import React, { Component } from 'react';
import { Grid, Header, Segment, Form, Icon, Card, Container, Accordion, Tab }
  from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Ticket from './ticket.component';

const panes = [
    {
      menuItem: 'Flight',
      render: () => 
        <Ticket />
    },
    {
      menuItem: 'Train',
      render: () => 
      <Container>
      <p>Tab 2 Content</p>
      <p>Tab 2 Content</p>
      <p>Tab 2 Content</p>
      </Container>
    },
    {
      menuItem: 'Bus',
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: 'Hotel',
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
  ]

  const panes2 = [
    {
      menuItem: 'Flight',
      render: () => 
      <Card>

      </Card>
    },
    {
      menuItem: 'Train',
      render: () => 
  
      <Container>
      <p>Tab 2 Content</p>
      <p>Tab 2 Content</p>
      </Container>
    },
    {
      menuItem: 'Bus',
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: 'Hotel',
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
  ]


export default class ManageBooking extends React.Component {
    
    // for Accordion
    state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  constructor(props) {
    super(props);
  }
  render () {
    const { activeIndex } = this.state
      return (
          <div className='background'>
            <Container>
                <Accordion styled fluid>
                    <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                    >
                        <Header as='h3'>
                            <Icon name='dropdown' />
                            UPCOMING BOOKINGS
                        </Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                    
                    </Accordion.Content>
                    <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                    >
                        <Header as='h3'>
                            <Icon name='dropdown' />
                            HISTORY
                        </Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        {/* <Tab menu={{ secondary: true, pointing: true }} panes={panes2} /> */}
                    </Accordion.Content>
                </Accordion>
            </Container>
        </div>
      )
  }
}
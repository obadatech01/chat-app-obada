// ch: 11, time: 04:11

import React from 'react'
import { Row } from 'reactstrap'
import Contact from './Contact';

export default class Contacts extends React.Component {
  render() {
    return (
      <div className='list'>
        <Row id="contacts">
          {this.props.contacts.map((contact, index) => this.renderContact(contact, index))}
        </Row>
      </div>
    );
  }

  renderContact = (contact, index) => {
    if(!contact) return;
    // Show only related messages.
    let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);

    let lastMessage = messages[messages.length-1];

    return (
      <div className='w-100' key={index}>
        <Contact contact={contact} message={lastMessage} />
      </div>
    )
  };
}

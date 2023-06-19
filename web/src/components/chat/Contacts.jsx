// ch: 11, time: 04:11

import React from 'react'
import { Input, Row } from 'reactstrap'
import Contact from './Contact';

export default class Contacts extends React.Component {

  state = { search: '' }

  onSearch = e => this.setState({search: e.target.value});

  render() {
    return (
      <div className='list'>
        <Row className="search">
          <Input onChange={this.onSearch} placeholder='بحث' />
        </Row>
        <Row id="contacts">
          {this.props.contacts.map((contact, index) => this.renderContact(contact, index))}
        </Row>
      </div>
    );
  }

  renderContact = (contact, index) => {
    if(!contact.name.includes(this.state.search)) return;
    if(!contact) return;
    // Show only related messages.
    let messages = this.props.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);

    let lastMessage = messages[messages.length-1];

    return (
      <div className='w-100' key={index} onClick={this.props.onChatNavigate.bind(this, contact)}>
        <Contact contact={contact} message={lastMessage} />
      </div>
    )
  };
}

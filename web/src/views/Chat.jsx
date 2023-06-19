import React from 'react';
import { Row } from 'reactstrap';
import { ChatHeader, ContactHeader, Contacts } from 'components';

class Chat extends React.Component {
  state = {
    user : { id: "1", name: "عمر" },
    contacts : [
      { id: "2", name: "علي" },
      { id: "3", name: "أحمد" },
    ],
     messages : [
      { sender: "1", receiver: "2", content: "مرحبا كيف حالك" },
      { sender: "1", receiver: "2", content: "مرحبا كيف حالك" },
      { sender: "3", receiver: "1", content: "مرحبا كيف حالك" },
      { sender: "1", receiver: "3", content: "مرحبا كيف حالك" },
      { sender: "2", receiver: "2", content: "مرحبا كيف حالك" },
      { sender: "3", receiver: "2", content: "مرحبا كيف حالك" },
      { sender: "2", receiver: "1", content: "مرحبا كيف حالك" },
    ],
  }

  render() {
    return (
      <Row className="h-100">
        <div id="contacts-section" className="col-6 col-md-4" >
          <ContactHeader />
          <Contacts contacts={this.state.contacts} messages={this.state.messages} />
        </div>

        <div id="messages-section" className="col-6 col-md-8" >
          <ChatHeader contact="" />
        </div>
      </Row>
    )
  }
}

export default Chat;
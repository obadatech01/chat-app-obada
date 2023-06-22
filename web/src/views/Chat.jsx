import React from 'react';
import { Row, Spinner } from 'reactstrap';
import { ChatHeader, ContactHeader, Contacts, MessageForm, Messages } from 'components';
import socketIO from 'socket.io-client';
import Auth from 'Auth';

class Chat extends React.Component {
  state = {
    user : { id: "1", name: "عمر" },
    contact : { id: "2", name: "علي" },
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

  componentDidMount() {
    this.initSocketConnection();
  }

  initSocketConnection = () => {
    // Connect to server and send user token.
    let socket = socketIO(process.env.REACT_APP_SOCKET, {
      query: 'token=' + Auth.getToken(),
    });
    console.log(socket);
    // Handle user connected event.
    socket.on('connect', () => this.setState({connected: true}));
    // Handle user disconnected event.
    socket.on('disconnect', () => this.setState({connected: false}));

  }

  onChatNavigate = contact => {
    this.setState({contact})
  }

  render() {
    if(!this.state.connected) {
      return <Spinner id="loader" color="success">{""}</Spinner>
    }

    return (
      <Row className="h-100">
        <div id="contacts-section" className="col-6 col-md-4" >
          <ContactHeader />
          <Contacts contacts={this.state.contacts} messages={this.state.messages} onChatNavigate={this.onChatNavigate} />
        </div>

        <div id="messages-section" className="col-6 col-md-8" >
          <ChatHeader contact={this.state.contact} />
          {this.renderChat()}
          <MessageForm />
        </div>
      </Row>
    );
  }

  /**
     * Render messages component.
     */
  renderChat = () => {
    const { contact, user } = this.state;
    if(!contact) return;
    // Show only related messages.
    let messages = this.state.messages.filter(e => e.sender === contact.id || e.receiver === contact.id);
    return <Messages user={user} messages={messages} />
};
}

export default Chat;
import React, { Component } from 'react'
import { Input } from 'reactstrap';

export default class MessageForm extends Component {

  state= { message: '', lastType: false };

  /**
  * Handle message change event.
  * @param e
  */
  onChange = e => this.setState({message: e.target.value});

  /**
  * Send message.
  * @param e
  */
  onSend = e => this.setState({message: ''});

  /**
  * Render component.
  */
  render() {
    return (
        <div id="send-message">
            <Input type="textarea" rows="3" onChange={this.onChange} value={this.state.message} placeholder="اكتب رسالتك هنا"/>
            <i className="fa fa-send text-muted px-3 send" onClick={this.onSend}/>
        </div>
    );
  }
}

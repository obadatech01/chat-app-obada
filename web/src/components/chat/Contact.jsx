import React from 'react'
import Avatar from 'components/Avatar';
import moment from 'moment/moment';

const Contact = (props) => {
  return (
    <div className='contact'>
      <div>
        <Avatar src={props.contact.avatar} />
        {props.contact.status === true ? <i className='fa fa-circle text-success' /> : ''}
        {/* {props.contact.status === true ? <i className='fa fa-circle online' /> : ''} */}
      </div>

      <div className="w-50">
        <div className="name">{props.contact.name}</div>
        <div className="small last-message">
          {props.message ? props.message.content : 'انقر هنا لبدء المحادثة'}
        </div>
      </div>

      <div className="flex-grow-1 text-left">
        <div className="small text-muted">
          {props.message ? moment(props.message.date).format('hh:mm a') : ''}
        </div>
      </div>
    </div>
  )
}

export default Contact;
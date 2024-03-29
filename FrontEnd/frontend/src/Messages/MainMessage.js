import React from 'react'
import Message from './Message'
import MessageList from './MessageList'
export default function MainMessage(props) {
    
  return (
    <div>
    
    <Message userId={props.userId} />
    <MessageList userId={props.userId} />
    <h1>Messaging App</h1>
  </div>
  )
}

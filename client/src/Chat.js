
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React from 'react';
import { addMessageMutation, messageAddedSubscription,  messagesQuery } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { loading, error, data} = useQuery(messagesQuery)

  const messages = data ? data.messages: []

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({client, subscriptionData}) => {
        client.writeData({data: {
            messages: messages.concat(subscriptionData.data.messageAdded)
        }})
    }
  })

  const [addMessage ] = useMutation(addMessageMutation) // [addMessage, {loading, error, data, called}] - available options.

  const handleSend = async (text) => {
    await addMessage({variables: {input: {text}}})
  }

  if ( loading) return <div>loading</div>
  if ( error) return <div>error</div>

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;

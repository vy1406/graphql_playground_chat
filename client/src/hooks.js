
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { addMessageMutation, messageAddedSubscription,  messagesQuery } from './graphql/queries';

export function useChatMessages() { 
    const { loading, error, data} = useQuery(messagesQuery)
  
    const messages = data ? data.messages: []
  
    useSubscription(messageAddedSubscription, {
      onSubscriptionData: ({client, subscriptionData}) => {
          client.cache.writeData({data: {
              messages: messages.concat(subscriptionData.data.messageAdded)
          }})
      }
    })
  
    const [addMessage ] = useMutation(addMessageMutation) // [addMessage, {loading, error, data, called}] - available options.
  
    return {
      error,
      loading, 
      messages,
      addMessage: (text) => addMessage({variables: {input: {text}}})
    }
  }
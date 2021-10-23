import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws'
import { getAccessToken } from '../auth';
import { getMainDefinition } from 'apollo-utilities';

const httpUrl = 'http://localhost:9000/graphql';
const wsUrl = 'ws://localhost:9000/graphql';

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    if (token) {
      operation.setContext({headers: {'authorization': `Bearer ${token}`}});
    }
    return forward(operation);
  }),
  new HttpLink({uri: httpUrl})
]);

const wsLink = new WebSocketLink({ uri: wsUrl, options: {
  connectionParams: () => ({ // payload that u saw at client + f12 -> Network -> filter by ws
    accessToken: getAccessToken() 
    // using connection params as an object, because by the time its invoked, it will get the access token, otherwise,
    // it wont be fast enought to get the accessToken while the app is loading
  }),
  lazy: true, // will make the subscription the first time its needed. 
  reconnect: true
}})

// from docs
function isSubscription(operation) {
  const definition = getMainDefinition(operation.query)
  return definition.kind === 'OperationDefinition'
          &&
          definition.operation === 'subscription'
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: split(isSubscription, wsLink, httpLink), // will check what protocol to use, depends of what type of the request ( ws / http)
  defaultOptions: {query: {fetchPolicy: 'no-cache'}}
});

export default client;

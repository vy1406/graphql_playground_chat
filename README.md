# GraphQL Chat Sample

Sample application used in the [GraphQL by Example](https://bit.ly/graphql-by-example) course.

# migrating to apollo client 3.0
On 14 July 2020 the Apollo team announced the release of Apollo Client 3.0.

Thankfully, there are very few breaking changes compared to the previous version used in the course. All the concepts you learnt are still valid.

In fact, there is basically just one major difference. As of Apollo Client 3.0, all the functionality is in a single npm package called @apollo/client.

Need only the core client functionality, without any framework-specific integration? Install @apollo/client. Need WebSockets and subscriptions? That's already in @apollo/client, no need to install additional packages. React hooks? Yep, they're in @apollo/client as well.

All the classes and functions we used in the course are still the same, they just need to be imported from the new package. Examples below.

Core Apollo Client

In the Job Board application we installed apollo-boost and wrote this code:

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
To use Apollo Client 3.0 instead simply install @apollo/client instead of apollo-boost and change the import to be:

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
WebSockets

In the Chat application we added support for WebSockets and subscription by installing an additional apollo-link-ws package and using the WebSocketLink class:

import { WebSocketLink } from 'apollo-link-ws';
That class is now available in @apollo/client and can be imported as follows:

import { WebSocketLink } from '@apollo/client/link/ws';
React Hooks

Instead of installing @apollo/react-hooks and importing:

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
all the hooks are now in @apollo/client:

import { useQuery, useMutation, useSubscription } from '@apollo/client';
Full Details

You can find the full details on what's changed in the new release in the Apollo documentation: Migrating to Apollo Client 3.0.

On Github I created a branch for each example with the code updated to Apollo Client 3.0:
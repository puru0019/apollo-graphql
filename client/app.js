import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
console.log(client);

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const App = () => (
    <div>
        <h1>Hello</h1>
        </div>
)

render(ApolloApp, document.getElementById('root'));
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

import Routes from './routes';

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        return {
            headers: {
                ...headers,
                'x-token': token,
                'x-refresh-token': refreshToken,
            },

        };
    });

    return forward(operation);
});

const authAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    console.log(context);
    if (headers) {
        const token = headers.get('x-token');
        const refreshToken = headers.get('x-refresh-token');

        if (token) {
            localStorage.setItem('token', token);
        }

        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }
    return response;
}));

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) => console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ));
            }
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authMiddleware,
        authAfterware,
        new HttpLink({
            uri: 'http://localhost:8081/graphql',
        }),
    ]),
    cache: new InMemoryCache(),
});

const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();

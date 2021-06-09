import App from './App';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import React from 'react';
import { render } from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);
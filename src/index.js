import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from "apollo-cache-inmemory"; 
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const defaultState = {
    isEditMode: false
};

const cache = new InMemoryCache();

persistCache({
    cache,
    storage: window.localStorage
})
.then( () => {
    const client = new ApolloClient({
        cache,
        uri: "https://api-euwest.graphcms.com/v1/ck1jdfg3g1rqs01et3kuu10fk/master",
        clientState: {
          defaults: defaultState,
          resolvers: {}
        }
    });

    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>, 
        document.getElementById('root'));
    
    serviceWorker.unregister();
});

/*
    Apollo Client is a complete state management library for JavaScript apps. Simply write a GraphQL query,
    and Apollo Client will take care of requesting and caching your data, as well as updating your UI.

    Fetching data with Apollo Client guides you to structure your code in a predictable,
    declarative way consistent with modern React best practices.
*/
import { ApolloClient } from 'apollo-client';

/*
    Apollo Client uses a normalized, in-memory cache to dramatically speed up the execution of queries that don't rely on real-time data.
*/
import { InMemoryCache } from 'apollo-cache-inmemory';

/*  Apollo HOC for Next.js. */
import withApollo from 'next-with-apollo';

/* 
    Get GraphQL results over a network using HTTP fetch.
    The http link is a terminating link that fetches GraphQL results from a GraphQL endpoint over an http connection. 
*/
import { createHttpLink } from 'apollo-link-http';

/*
"isomorphic unfetch" make us use "fetch" in both node and client, as the name isomorphic says that.
*/
import fetch from 'isomorphic-unfetch';


const GRAPHQL_URL = 'https://api.graphql.jobs/';

const link = createHttpLink({
    fetch, // Switches between unfetch & node-fetch for client & server.
    uri: GRAPHQL_URL
});


/*

withApollo accepts a function that receives { ctx, headers } in the first render with SSR (Server Side Rendering).
This is done to fetch your queries and hydrate the store before we send the page to the browser.

withApollo will receive { initialState } if the render is happening in the browser,
with the following line we're hydrating our cache with the initial state created in the server.
*/


export default withApollo(
    // You can get headers and ctx (context) from the callback params
    // e.g. ({ headers, ctx, initialState })
    ({ initialState }) =>
        new ApolloClient({
            link: link,
            cache: new InMemoryCache()
                //  rehydrate the cache using the initial data passed from the server:
                .restore(initialState || {})
        })
);
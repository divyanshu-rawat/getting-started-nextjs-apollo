/*
    Next.js wraps your entire application in an App component to persist layout,
    keep state and inject additional data into your page.

    This is the perfect place to put our Apollo Provider, wrapping the entire application in the component.
*/

import React from 'react';
import App from 'next/app';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import withApollo from '../apollo.client';

class MyApp extends App {
    render() {
        const { Component, pageProps, apollo } = this.props;
        return (
            <ApolloProvider client={apollo}>
                <ApolloHooksProvider client={apollo}>
                    <Component {...pageProps} />
                </ApolloHooksProvider>
            </ApolloProvider>
        )
    }
}

export default withApollo(MyApp);


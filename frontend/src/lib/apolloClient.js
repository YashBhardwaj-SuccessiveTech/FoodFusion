"use client";

import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP link for queries/mutations
const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql", // ✅ backend URL
});

// WebSocket link for subscriptions
const wsLink = typeof window !== "undefined" ? new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8080/graphql", // ✅ WebSocket endpoint
  })
) : null;

// Split link: choose ws for subscriptions, http otherwise
const splitLink = typeof window !== "undefined" && wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

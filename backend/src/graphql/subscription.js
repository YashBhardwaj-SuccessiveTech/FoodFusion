import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.js";
import resolvers from "./resolver.js";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const setupWebSocketServer = (server) => {
    const wsServer = new WebSocketServer({
        server,
        path: "/graphql",
    });
    useServer({ schema }, wsServer);
};

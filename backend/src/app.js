import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/authroutes.js";
import receiperouter from "./routes/receiperoutes.js";

import { ApolloServer } from "apollo-server-express";

import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolver.js";

import { createServer } from "http";
import { useServer } from "graphql-ws/lib/use/ws"; // ✅ correct
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import userrouter from "./routes/userroutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Middleware (only for REST APIs, not GraphQL)

const schema=makeExecutableSchema({ typeDefs, resolvers })
app.use(cors());
app.use("/api/v1", express.json(), router, receiperouter, userrouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server working perfectly" });
});
app.get("/common", (req, res) => res.send("hello ji"));

// GraphQL setup
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  // Create HTTP server for subscriptions
  const httpServer = createServer(app);

  // Setup WS server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer({ schema }, wsServer);

  httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
    console.log(`WebSocket endpoint: ws://localhost:${port}/graphql`);
  });
};

startServer();

// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import router from "./routes/authroutes.js";
// import receiperouter from "./routes/receiperoutes.js";

// import { ApolloServer } from "apollo-server-express";
// import typeDefs from "./graphql/schema.js";
// import resolvers from "./graphql/resolver.js";

// import { createServer } from "http";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws"; // ✅ correct import
// import { makeExecutableSchema } from "@graphql-tools/schema";

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 5000;

// connectDB();

// // Middleware
// app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "*",
//     // methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // REST APIs
// app.use("/api/v1", router, receiperouter);
// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Server working perfectly" });
// });
// app.get("/common", (req, res) => res.send("hello ji"));

// // Create GraphQL schema
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// // Apollo Server setup
// const server = new ApolloServer({ schema });

// const startServer = async () => {
//   await server.start();
//   server.applyMiddleware({ app, path: "/graphql" });

//   // Create HTTP server for subscriptions
//   const httpServer = createServer(app);

//   // WebSocket server for subscriptions
//   const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: "/graphql",
//   });

//   useServer({ schema }, wsServer);

//   httpServer.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
//   });
// };

// startServer();

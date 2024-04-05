import { ApolloServer } from "@apollo/server";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { startStandaloneServer } from "@apollo/server/standalone";
import mergeResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typedefs/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { connectionDB } from "./db/connectDB.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergeTypeDefs,
  resolvers: mergeResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, { context: async ({ req }) => ({ req }) })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

await connectionDB();

// const { url } = await startStandaloneServer(server);
console.log(`server ready at localhost:4000`);

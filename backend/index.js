import { ApolloServer } from "@apollo/server";
import express from "express";
import http from "http";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mergeResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typedefs/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { connectionDB } from "./db/connectDB.js";
import { MONGO_URI, SESSION_SECRET } from "./config/index.js";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.config.js";

const app = express();
const httpServer = http.createServer(app);
configurePassport();

// mongodb session management start
const MongoDBStore = connectMongo(session);
const store = MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => console.error(err));

// mongodb session management end

const server = new ApolloServer({
  typeDefs: mergeTypeDefs,
  resolvers: mergeResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

await connectionDB();

// const { url } = await startStandaloneServer(server);
console.log(`server ready at localhost:4000`);

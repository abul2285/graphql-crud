import "reflect-metadata";
import express from 'express'
import { createConnections } from "typeorm";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { PostResolver } from "./PostResolver";

(async () => {
    const app = express();
    app.get('/', (_req, res) => {
        res.send('Hello World')
    })

    await createConnections();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('Server is running')
    })
})()
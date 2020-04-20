import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { IResolvers, makeExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';
import graphQLHTTP from 'express-graphql'

const app =express();

app.use('*',cors());

app.use(compression());


const typeDefs=`
    type Query {
        hola: String!
        holaConNombre(nombre: String!): String!
        holaAlCursoGraphQL: String!
    }
`;

const resolvers : IResolvers={
    Query : {
        hola(): string{
            return 'Hola Mundo'
        },
        holaConNombre(__: void, { nombre } ): string {
            return `Hola Mundo ${nombre}`;
        },
        holaAlCursoGraphQL(): string {
            return 'Hola Mundo en el curso de GraphQL';
        }
    }
}

const schema: GraphQLSchema=makeExecutableSchema({
    typeDefs,
    resolvers
})


app.use('/', graphQLHTTP({
    schema,
    graphiql:true
}));

const PORT=5300;

app.listen({
    port:PORT
},()=>console.log(`Hola Mundo APIGraphQL http://localhost:${PORT}`))
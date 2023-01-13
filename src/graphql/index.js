const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const typeDefs = `
  type Query {
    hello: String!
    getPerson(name: String, age: Int): String
    getInt: Int!
    getFloat: Float
    getBoolean: Boolean
    getString: String
    getID: ID
    getNumbers(numbers:[Int!]!): [Int]
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getPerson: (parent, args) => {
      return `Hello ${args.name}! You are ${args.age} years old.`;
    },
    getInt: () => 1,
    getFloat: () => 1.1,
    getBoolean: () => true,
    getString: () => 'Hello world!',
    getID: () => '123',
  },
};

const useGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  server.applyMiddleware({ app });
};

module.exports = useGraphQL;

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Maker {
    id: Int!,
    name: String!,
    email: String!,
    password: String!,
    pizzas: [Pizza]
  }

  type Pizza {
    id: Int!,
    handle: String!,
    description: String!,
    views: Int!,
    toppings: [Topping],
    maker: Maker
  }

  type Topping {
    id: Int!,
    name: String!,
    price: Float!
  }

  type Query {
    allPizzas: [Pizza!]!,
    allToppings: [Topping!]!,
    allMakers: [Maker!]!
  }

  type Mutation {
    createMaker(name: String!, email: String!, password: String!): Maker,
  }
` ;

export default makeExecutableSchema({typeDefs, resolvers});
const { getProduct, getProducts } = require('./product.resolver');

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
    // Products
    product: getProduct,
    products: getProducts,
  },
};

module.exports = resolvers;

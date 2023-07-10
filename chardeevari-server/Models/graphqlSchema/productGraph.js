const { buildSchema } = require('graphql');
const Product = require('../productSchema');
const { GraphQLObjectType, GraphQLSchema,GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');


const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    productName: { type: GraphQLString },
    brand: { type: GraphQLString },
    productPrice: { type: GraphQLFloat },
  },
});

// Define the root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      getAllProducts: {
        type: new GraphQLList(ProductType),
        resolve: async () => {
          const products = await Product.find();
          console.log(products);
          return products;
        },
      },
    },
  });
  

const schema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = schema; 

const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

interface PlaceType {
  'place name': string;
  longitude: string;
  state: string;
  'state abbreviation': string;
  latitude: string;
}

interface ZippopotamType {
  data: {
    'post code': string;
    country: string;
    'country abbreviation': string;
    places: Array<PlaceType>;
  };
}

const typeDefs = gql`
  type ZipInformation {
    city: String!
    state: String!
  }

  type Query {
    zipInformation(country: String!, zipCode: String!): ZipInformation
  }
`;

const resolvers = {
  Query: {
    zipInformation: async (
      _parent: any,
      { country, zipCode }: { country: string; zipCode: string }
    ) =>
      await axios
        .get(`http://api.zippopotam.us/${country}/${zipCode}`)
        .then(({ data }: ZippopotamType) => {
          const city = data.places[0]['place name'];
          const state = data.places[0]['state'];
          return { city, state };
        })
        .catch((error: Error) => {
          console.log(error);
          // TODO - Do something with error - a toast?
        }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 9000 })
  .then(({ url }: { url: string }) => console.log(`Server running at ${url}`));

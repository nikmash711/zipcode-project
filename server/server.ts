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
    countries: [Country]
  }

  type Country {
    name: String!
    code: String!
  }
`;

// Hard-coded this because the API doesn't return it.
const countries = [
  { name: 'Andorra', code: 'AD' },
  { name: 'Argentina', code: 'AR' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Austria', code: 'AT' },
  { name: 'Australia', code: 'AU' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Canada', code: 'CA' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Germany', code: 'DE' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Spain', code: 'ES' },
  { name: 'Finland', code: 'FI' },
  { name: 'Faroe Islands', code: 'FO' },
  { name: 'France', code: 'FR' },
  { name: 'Great Britain', code: 'GB' },
  { name: 'French Guyana', code: 'GF' },
  { name: 'Guernsey', code: 'GG' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guam', code: 'GU' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'India', code: 'IN' },
  { name: 'Iceland', code: 'IS' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jersey', code: 'JE' },
  { name: 'Japan', code: 'JP' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Moldavia', code: 'MD' },
  { name: 'Marshall Islands', code: 'MH' },
  { name: 'Macedonia', code: 'MK' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Holland', code: 'NL' },
  { name: 'Norway', code: 'NO' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Phillippines', code: 'PH' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Poland', code: 'PL' },
  { name: 'Saint Pierre and Miquelon', code: 'PM' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Portugal', code: 'PT' },
  { name: 'French Reunion', code: 'RE' },
  { name: 'Russia', code: 'RU' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Svalbard & Jan Mayen Islands', code: 'SJ' },
  { name: 'Slovak Republic', code: 'SK' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Turkey', code: 'TR' },
  { name: 'United States', code: 'US' },
  { name: 'Vatican', code: 'VA' },
  { name: 'Virgin Islands', code: 'VI' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'South Africa', code: 'ZA' },
];

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
    countries: () => countries,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 9000 })
  .then(({ url }: { url: string }) => console.log(`Server running at ${url}`));

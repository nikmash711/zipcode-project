import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';

import { LocationApp } from 'components/LocationApp';

const client = new ApolloClient({
  uri: 'http://localhost:9000/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <LocationApp />
  </ApolloProvider>
);

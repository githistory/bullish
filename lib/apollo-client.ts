import axios from 'axios';
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { buildAxiosFetch } from '@lifeomic/axios-fetch';

const link = new HttpLink({
  uri: 'http://localhost:3000/api/graphql',
  // fetch: axios,
  fetch: buildAxiosFetch(axios),
  fetchOptions: {
    duplex: 'half'
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

export default client
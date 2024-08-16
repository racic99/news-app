import { api } from '../api';
import fetchPersonalized from './fetchPersonalized';
import searchNews from './searchNews';

export const newsApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchPersonalizedNews: fetchPersonalized(build),
    searchNews: searchNews(build),
  }),
});

export const { useFetchPersonalizedNewsQuery, useSearchNewsQuery } = newsApi;

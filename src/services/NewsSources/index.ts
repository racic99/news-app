import { api } from '../api';
import fetchAll from './fetchAll';

export const newsSourcesApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchAllNewsSources: fetchAll(build),
  }),
});

export const { useFetchAllNewsSourcesQuery } = newsSourcesApi;

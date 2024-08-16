/* eslint-disable import/no-anonymous-default-export */
import { EndpointBuilder, BaseQueryFn } from '@reduxjs/toolkit/query';
import { NewsSource, NewsSourceResponse } from 'types/NewsSource';

export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<NewsSource[], void>({
    query: () => '/top-headlines/sources',
    transformResponse: (response: NewsSourceResponse) => {
      return response.sources;
    },
  });

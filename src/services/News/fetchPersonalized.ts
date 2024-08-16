/* eslint-disable import/no-anonymous-default-export */
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/dist/query';
import { PAGE_SIZE } from 'constants/numbers';
import { EMPTY_STRING } from 'constants/strings';
import { ArticleData, ArticleResponse } from 'types/Article';
import { getTotalPages } from 'utils/api-util';

type FetchPersonalizedNewsQueryParams = {
  page?: number;
  sources?: string;
  category?: string;
};

export default (build: EndpointBuilder<BaseQueryFn, string, string>) => {
  return build.query<ArticleData, FetchPersonalizedNewsQueryParams>({
    query: ({ page, sources, category }) =>
      `/top-headlines?page=${page}&pageSize=${PAGE_SIZE}
    ${sources ? '&sources=' + sources : EMPTY_STRING}
    ${category ? '&category=' + category : EMPTY_STRING}`,
    transformResponse: (response: ArticleResponse): ArticleData => {
      return {
        articles: response.articles,
        totalPages: getTotalPages(response.totalResults, PAGE_SIZE),
      };
    },
    keepUnusedDataFor: 1,
    serializeQueryArgs: ({ queryArgs }) => {
      const newQueryArgs = { ...queryArgs };

      if (newQueryArgs.page) {
        delete newQueryArgs.page;
      }

      return newQueryArgs;
    },
    merge: (currentCache, newItems, { arg }) => {
      if (currentCache && arg.page && arg.page > 1) {
        return {
          totalPages: newItems.totalPages,
          articles: [...currentCache.articles, ...newItems.articles],
        };
      }
      return newItems;
    },
    forceRefetch: ({ currentArg, previousArg }) => {
      return currentArg?.page !== previousArg?.page || currentArg?.page === 1;
    },
  });
};

import {
  API_MAX_ALLOWED_RESULTS,
  INITIAL_PAGE_NUMBER,
  PAGE_SIZE,
} from 'constants/numbers';
import { getTotalPages } from 'utils/api-util';
import { useState } from 'react';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);

  const increasePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const resetPages = () => {
    setCurrentPage(INITIAL_PAGE_NUMBER);
  };

  const handlePageIncrease = (totalPages: number) => {
    currentPage < totalPages - 1 &&
      currentPage < getTotalPages(API_MAX_ALLOWED_RESULTS, PAGE_SIZE) && // To make sure it can't go over the max allowed results from API free plan
      increasePage();
  };

  return { page: currentPage, handlePageIncrease, resetPages };
};
export default usePagination;

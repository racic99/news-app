import { useAppSelector } from 'hooks/reduxOverwriteHooks';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import usePagination from 'hooks/usePagination';
import { useMemo, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useFetchPersonalizedNewsQuery } from 'services/News';
import { SelectOption } from 'types/Select';

const useHome = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SingleValue<SelectOption>>();
  const [selectedSources, setSelectedSources] =
    useState<MultiValue<SelectOption>>();
  const { page, handlePageIncrease, resetPages } = usePagination();

  const { newsSources } = useAppSelector(({ newsSource }) => newsSource);

  const newsSourcesSelectOptions = useMemo(() => {
    return newsSources.map((source) => ({
      value: source.id,
      label: source.name,
    }));
  }, [newsSources]);

  const joinedSelectedSources = useMemo(() => {
    return selectedSources?.map((source) => source.value).join(',');
  }, [selectedSources]);

  const { data: articleData, isFetching } = useFetchPersonalizedNewsQuery(
    {
      category: selectedCategory?.value,
      sources: joinedSelectedSources,
      page,
    },
    { skip: !selectedCategory?.value && !selectedSources?.length },
  );

  const { scrollableContentRef } = useInfiniteScroll(
    articleData?.totalPages || 0,
    isFetching,
    handlePageIncrease,
  );

  const handleUpdateSelectedCategory = (
    newSelectedCategory: SingleValue<SelectOption>,
  ) => {
    resetPages();
    setSelectedCategory(newSelectedCategory);
    setSelectedSources([]);
  };

  const handleUpdateSelectedSources = (
    updatedSelectedSources: MultiValue<SelectOption>,
  ) => {
    resetPages();
    setSelectedSources(updatedSelectedSources);
    setSelectedCategory(null);
  };

  return {
    scrollableContentRef,
    articles: articleData?.articles,
    isFetching,
    selectedCategory,
    handleUpdateSelectedCategory,
    selectedSources,
    handleUpdateSelectedSources,
    newsSourcesSelectOptions,
  };
};

export default useHome;

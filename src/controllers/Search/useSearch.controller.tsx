import { EMPTY_STRING } from 'constants/strings';
import { useAppSelector } from 'hooks/reduxOverwriteHooks';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import usePagination from 'hooks/usePagination';
import { useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { useSearchNewsQuery } from 'services/News';
import { SelectOption } from 'types/Select';
import _ from 'lodash';
import moment from 'moment';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState(EMPTY_STRING);
  const [selectedSources, setSelectedSources] =
    useState<MultiValue<SelectOption>>();
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const { page, handlePageIncrease, resetPages } = usePagination();

  const { newsSources } = useAppSelector(({ newsSource }) => newsSource);

  const onChangeSearchTerm = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      resetPages();
      setSearchTerm(e.target.value);
    },
    500,
  );

  const newsSourcesSelectOptions = useMemo(() => {
    return newsSources.map((source) => ({
      value: source.id,
      label: source.name,
    }));
  }, [newsSources]);

  const joinedSelectedSources = useMemo(() => {
    return selectedSources?.map((source) => source.value).join(',');
  }, [selectedSources]);

  const { data: articleData, isFetching } = useSearchNewsQuery(
    {
      sources: joinedSelectedSources,
      searchTerm,
      fromDate: dateFrom && moment(dateFrom).format('YYYY-MM-DD'),
      toDate: dateTo && moment(dateTo).format('YYYY-MM-DD'),
      page,
    },
    { skip: searchTerm.length < 3 },
  );

  const { scrollableContentRef } = useInfiniteScroll(
    articleData?.totalPages || 0,
    isFetching,
    handlePageIncrease,
  );

  const handleUpdateSelectedSources = (
    updatedSelectedSources: MultiValue<SelectOption>,
  ) => {
    resetPages();
    setSelectedSources(updatedSelectedSources);
  };

  const handleUpdateDateFrom = (date: Date | null) => {
    if (!date) return;

    if (!dateTo || date <= dateTo) {
      setDateFrom(date);
    } else {
      alert('The selected date is after the dateTo!');
    }
  };

  const handleUpdateDateTo = (date: Date | null) => {
    if (!date) return;

    if (!dateFrom || date >= dateFrom) {
      setDateTo(date);
    } else {
      alert('The selected date is before the dateFrom!');
    }
  };

  return {
    scrollableContentRef,
    articles: articleData?.articles,
    isFetching,
    onChangeSearchTerm,
    selectedSources,
    handleUpdateSelectedSources,
    newsSourcesSelectOptions,
    dateFrom,
    dateTo,
    handleUpdateDateFrom,
    handleUpdateDateTo,
  };
};

export default useSearch;

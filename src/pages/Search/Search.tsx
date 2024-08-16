import ArticleContainer from 'components/ArticleContainer';
import useSearch from 'controllers/Search/useSearch.controller';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Search = () => {
  const {
    articles,
    isFetching,
    scrollableContentRef,
    onChangeSearchTerm,
    selectedSources,
    handleUpdateSelectedSources,
    newsSourcesSelectOptions,
    dateFrom,
    dateTo,
    handleUpdateDateFrom,
    handleUpdateDateTo,
  } = useSearch();
  return (
    <div className="flex flex-col justify-center items-center py-8 px-4">
      <h1 className="text-4xl xs:text-5xl font-bold text-center">Search</h1>
      <Link className="px-4 py-2 bg-red-500 rounded-xl text-white mt-4" to="/">
        Go to Home Page
      </Link>
      <div className="flex flex-col w-full">
        <div className="flex mt-4 gap-3 md:gap-6 w-full md:flex-row flex-col justify-center items-center">
          <div className="flex items-center flex-col gap-2 w-full xs:w-auto">
            <p>Search Field</p>
            <input
              className="w-full xs:w-80 border border-neutral-300 border-solid rounded-md h-9 px-3"
              type="text"
              placeholder="Search..."
              onChange={onChangeSearchTerm}
            />
          </div>
          <div className="flex items-center flex-col gap-2 w-full xs:w-auto">
            <p>Select Source Filters</p>
            <Select
              isMulti
              value={selectedSources}
              name="sources"
              options={newsSourcesSelectOptions}
              className="basic-multi-select w-full xs:w-80"
              classNamePrefix="select"
              onChange={handleUpdateSelectedSources}
            />
          </div>
        </div>
        <div className="flex mt-4 gap-3 md:gap-6 w-full md:flex-row flex-col justify-center items-center">
          <div className="flex items-center flex-col gap-2 w-full xs:w-auto">
            <p>Date From</p>
            <DatePicker
              selected={dateFrom}
              placeholderText="Date From"
              className="w-full xs:w-80 border border-neutral-300 border-solid rounded-md h-9 px-3"
              onChange={handleUpdateDateFrom}
            />
          </div>
          <div className="flex items-center flex-col gap-2 w-full xs:w-auto">
            <p>Date To</p>
            <DatePicker
              selected={dateTo}
              placeholderText="Date To"
              className="w-full xs:w-80 border border-neutral-300 border-solid rounded-md h-9 px-3"
              onChange={handleUpdateDateTo}
            />
          </div>
        </div>
      </div>
      <ArticleContainer
        articles={articles}
        scrollableContentRef={scrollableContentRef}
      />
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

export default Search;

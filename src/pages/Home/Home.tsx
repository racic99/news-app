import ArticleContainer from 'components/ArticleContainer';
import { articleCategories } from 'constants/articles';
import useHome from 'controllers/Home/useHome.controller';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Home = () => {
  const {
    articles,
    isFetching,
    scrollableContentRef,
    selectedCategory,
    handleUpdateSelectedCategory,
    selectedSources,
    handleUpdateSelectedSources,
    newsSourcesSelectOptions,
  } = useHome();
  return (
    <div className="flex flex-col justify-center items-center py-8 px-4">
      <h1 className="text-4xl xs:text-5xl font-bold text-center">
        Personalized News
      </h1>
      <Link
        className="px-4 py-2 bg-red-500 rounded-xl text-white mt-4"
        to="/search"
      >
        Go to Search Page
      </Link>
      <div className="flex mt-4 gap-3 md:gap-6 w-full md:flex-row flex-col justify-center items-center">
        <div className="flex items-center flex-col gap-2 w-full xs:w-auto">
          <p>Select Category Filter</p>
          <Select
            value={selectedCategory}
            name="categories"
            options={articleCategories}
            className="basic-select w-full xs:w-80"
            classNamePrefix="select"
            onChange={handleUpdateSelectedCategory}
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
      <ArticleContainer
        articles={articles}
        scrollableContentRef={scrollableContentRef}
      />
      {isFetching && <div>Loading...</div>}
    </div>
  );
};

export default Home;

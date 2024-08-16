import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchAllNewsSourcesQuery } from 'services/NewsSources';
import { setNewsSources } from 'store/NewsSource';

const useMain = () => {
  const dispatch = useDispatch();
  const { data } = useFetchAllNewsSourcesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setNewsSources(data));
    }
  }, [data, dispatch]);
};

export default useMain;

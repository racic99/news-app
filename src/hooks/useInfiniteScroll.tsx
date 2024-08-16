import { useEffect, useRef } from 'react';
import _ from 'lodash';

const useInfiniteScroll = (
  totalPages: number,
  isLoading: boolean,
  handlePageIncrease: (totalPages: number) => void,
) => {
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const handleScroll = _.debounce(() => {
    const scrollableContent = scrollableContentRef.current;

    if (isLoading || !scrollableContent) return;

    const offsetHeight = scrollableContent.offsetHeight;
    const offsetTop = scrollableContent.offsetTop;
    const position = window.pageYOffset;
    const viewHeight = window.innerHeight;
    const bottomOffset = 50;

    if (position >= offsetHeight + offsetTop - viewHeight - bottomOffset) {
      handlePageIncrease(totalPages);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollableContentRef,
  };
};

export default useInfiniteScroll;

import ArticleCard from 'components/ArticleCard';
import { FC, memo } from 'react';
import { Article } from 'types/Article';

type ArticleContainerProps = {
  articles: Article[] | undefined;
  scrollableContentRef: React.RefObject<HTMLDivElement>;
};

const ArticleContainer: FC<ArticleContainerProps> = ({
  articles,
  scrollableContentRef,
}) => {
  return (
    <div
      className="container max-w-[1280px] flex flex-wrap justify-center items-center gap-4 py-6"
      ref={scrollableContentRef}
    >
      {articles?.map((article) => (
        <ArticleCard key={article.url} article={article} />
      ))}
    </div>
  );
};

export default memo(ArticleContainer);

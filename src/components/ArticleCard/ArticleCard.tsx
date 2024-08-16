import { FC, memo } from 'react';
import { Article } from 'types/Article';
import moment from 'moment';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="flex flex-row w-full xs:w-[400px] h-[120px] items-center rounded-xl bg-orange-50 p-3 gap-4 cursor-pointer hover:bg-orange-200">
      <img
        className="w-[106px] h-[106px] object-cover rounded-lg"
        src={article.urlToImage || '/assets/news-placeholder.jpg'}
        alt={article.title}
      />
      <div className="h-full flex flex-col justify-between flex-1">
        <h3 className="line-clamp-2 font-bold text-sm">
          {article.title || 'Title unavailable'}
        </h3>
        <div className="flex flex-col text-[10px] font-bold">
          <p>{article.source.name || 'Source unavailable'}</p>
          <p>{article.author || 'Author unavailable'}</p>
          <p className="text-[10px] text-red-500 font-bold">
            {moment(article.publishedAt).format('DD/MM/YYYY | HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ArticleCard);

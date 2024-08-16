export type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type ArticleData = {
  totalPages: number;
  articles: Article[];
};

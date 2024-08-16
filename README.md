## Getting Started

App is containerized using Docker, run it with following command:

```bash
docker run -d -it --rm -p 3001:3000 --name news_app_container racic99/news-app
```

App is now available on:

```bash
http://localhost:3001/
```

Use this command to stop running the app, container will be automatically removed afterwards

```bash
docker kill news_app_container
```

Task Requirements explanation:

1. Article search and filtering: Users should be able to search for articles by keyword and
   filter the results by date, category, and source.

On endpoint for article search Category filter doesn't exist

2. Personalized news feed: Users should be able to customize their news feed by
   selecting their preferred sources, categories, and authors.

On endpoint for displaying personalized news API doesn't allow combining source and category filter, author filter doesn't exist

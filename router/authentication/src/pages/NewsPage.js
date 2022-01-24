import React from "react";

import NewsList from "../components/NewsList";

import withDataLoader from "../utils/withDataLoader";

const WithDataLoaderNewsList = withDataLoader(NewsList, () => "private/news");

/**
 * Страница новостей
 * 
 */
const NewsPage = () => (
  <div className="news-container container">
    <div className="row row-cols-2 gx-5 gy-5">
      <WithDataLoaderNewsList />
    </div>
  </div>
);

export default NewsPage;
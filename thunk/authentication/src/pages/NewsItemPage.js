import React from "react";
import { useMatch } from "react-router-dom";

import NewsItem from "../components/NewsItem";
import withDataLoader from "../utils/withDataLoader";

const WithDataLoaderNewsItem = withDataLoader(NewsItem, props => "private/news/" + props.itemId);

/**
 * Страница новости
 *  
 */
const NewsItemPage = () => {
  const { params } = useMatch("/news/:id");

  return (
    <div className="news-container container">
      <WithDataLoaderNewsItem itemId={params.id} />
    </div>
  );

};

export default NewsItemPage;
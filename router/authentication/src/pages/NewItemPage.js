import React from "react";
import { useMatch } from "react-router-dom";

import NewItem from "../components/NewItem";
import withDataLoader from "../utils/withDataLoader";

const WithDataLoaderNewItem = withDataLoader(NewItem, props => "private/news/" + props.itemId);

/**
 * Страница новости
 *  
 */
const NewItemPage = () => {
  const { params } = useMatch("/news/:id");

  return (
    <div className="news-container container">
      <WithDataLoaderNewItem itemId={params.id} />
    </div>
  );

};

export default NewItemPage;
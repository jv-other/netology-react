import React from "react";
import PostList from "../components/PostList";
import withDataLoader from "../utils/withDataLoader";

const WithDataLoaderPostList = withDataLoader(PostList, "loading-spinner spinner-border text-primary");

/**
 * Страница списка постов
 *  
 */
const Home = () => (
  <div className="page container-sm">
    <WithDataLoaderPostList path="posts" />
  </div>
);

export default Home;
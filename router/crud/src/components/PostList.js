import React from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

/**
 * Компонент визуализации списка постов
 * @component
 * 
 * @prop {object[]} data Список постов  
 *  
 */
const PostList = ({ data }) => (
  <>
    {data?.map(post => (
      <PostItem key={post.id} data={post} />
    ))}
  </>
);

PostList.propTypes = {
  data: PropTypes.arrayOf(PostItem.propTypes.data)
};

export default PostList;
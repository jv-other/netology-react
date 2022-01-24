import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import PostView from "../components/PostView";

// const WithDataLoaderPost = withDataLoader(PostView, "loading-animated-background");

/**
 * Карточка просмотра поста
 * 
 */
const ViewPost = () => {
  const { state } = useLocation();

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="page modal-dialog modal-lg">
        <div className="modal-content">
          <PostView data={{ ...state }} />
        </div>
      </div>
    </div>
  );
};

ViewPost.propTypes = {
  match: PropTypes.object
};

export default ViewPost;
import React from "react";
import { useLocation } from "react-router-dom";
import PostForm from "../components/PostForm";

/**
 * Карточка редактирования поста
 *
 */
const EditPost = () => {
  const { state } = useLocation();

  return (
    <div>
      <div className="modal" style={{ display: "block" }}>
        <div className="page modal-dialog modal-lg">
          <div className="modal-content">
            <PostForm data={{ ...state }} />
          </div>
        </div>
      </div>
    </div>
  );

};

export default EditPost;
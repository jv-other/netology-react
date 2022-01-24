import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import ProfileContext from "./ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import timeAgo from "../utils/timeAgo";

/**
 * Компонент визуализации поста
 * @component
 * 
 * @prop {object} data Данные поста
 * @prop {bool} showCommentInput Показывать строку ввода комментария при первой отрисовке
 *  
 */
const Post = ({ data, showCommentInput = false }) => {
  const [inputComment, setInputComment] = useState(showCommentInput);
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Переход к карточке поста
  const show = () => {
    const target = "/posts/" + data.id;
    (location.pathname != target) && navigate(target, { state: { ...data } });
  };

  const commentLine = inputComment ? (
    <li className="list-group-item">
      <form className="input-group d-flex justify-content-between align-items-center">
        <span className="profile-avatar-small me-2">
          <img className="rounded-circle" src={profile.avatar} alr={profile.name} />
        </span>
        <input
          name="comment"
          className="form-control rounded-pill"
          placeholder="Напишите комментарий"
          readOnly={true}
        />
      </form>
    </li>
  ) : null;

  return (
    <>
      <li
        className="list-group-item d-flex justify-content-start gx-4 text-decoration-none"
        style={{ cursor: "pointer", borderRadius: "0.3rem" }}
        onClick={show}
      >
        <div className="author-avatar flex-shrink-0">
          <img
            className="post-author-avatar rounded-circle"
            src={data?.author?.avatar} alt={data?.author?.name}
          />
        </div>
        <div className="author-text flex-grow-1 ms-3">
          <div>
            <span className="author-title fs-5 fw-bold">{data?.author?.name}</span>
          </div>
          <div className="text-black-50">
            <span className="author-info fs-6 fw-bold">
              {data?.author?.place.country}&nbsp;{data?.author?.place.city}
            </span>
            <span className="post-date">
              {data?.created && timeAgo(data.created)}
            </span>
          </div>
        </div>
      </li>
      <li style={{ cursor: "pointer" }} className="post-content list-group-item" onClick={show}>
        <p style={{ whiteSpace: "pre-line" }}>{data?.content}</p>
      </li>
      <li className="list-group-item d-flex justify-content-around">
        <button className="btn">
          <i className="far fa-thumbs-up"></i>
          &nbsp;Нравится
        </button>
        <button className="btn" onClick={() => setInputComment(prevValue => !prevValue)}>
          <i className="far fa-comment-alt"></i>
          &nbsp;Комментировать
        </button>
      </li>
      {commentLine}
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    created: PropTypes.any,
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
      place: PropTypes.shape({
        country: PropTypes.string,
        city: PropTypes.string
      })
    })
  }),
  showCommentInput: PropTypes.bool
}

export default Post;
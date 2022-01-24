import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileContext from "./ProfileContext";
import useStorage from "../utils/useStorage";
import Post from "./Post";

/**
 * Форма редактирования поста
 * @component
 * 
 * @prop {object} data Данные поста 
 * 
 */
const PostForm = ({ data }) => {
  const { profile } = useContext(ProfileContext);

  const [content, setContent] = useStorage(
    localStorage, "draftPost#" + data?.id, data?.content
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Переход к карточке просмотра поста или в список, если пост новый
  const complete = () => {
    setContent(null);
    setLoading(false);
    isFinite(data?.id) ? navigate("/posts/" + data.id, {
      replace: true,
      state: { ...data, content, author: profile, created: new Date().getTime() }
    }) : navigate("/");
  };

  const handleChange = ({ target }) => setContent(target.value);

  // Отправка данных серверу
  const handleSubmit = (evt) => {
    evt.preventDefault();

    setLoading(true);
    window.fetch(process.env.REACT_APP_SERVER_URL + "/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: isFinite(data?.id) ? data.id : 0, content: content, author: profile })
    }).then(response => response.ok ? complete() : (async () => {
      throw {
        responseStatus: response.status,
        message: await response.text()
      }
    })())
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  };

  // Отмена (кнопка "Закрыть")
  const handleClose = () => {
    isFinite(data?.id) && setContent(null);
    data?.id ? navigate(-1, { state: { ...data } }) : navigate("/");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header d-flex justify-content-between">
        {isFinite(data?.id) ? "Редактировать публикацию" : "Создать публикацию"}
        <button className="btn-close" type="button" onClick={handleClose}></button>
      </div>
      <div className="post-form-content card-body">
        <div className="profile-avatar-small flex-shrink-0 me-3">
          <img
            className="post-author-avatar rounded-circle"
            src={profile.avatar}
            alt={profile.name}
          />
        </div>
        <textarea
          name="content"
          className={`form-control ${error ? "is-invalid" : ""}`}
          style={{ resize: "none" }}
          disabled={loading}
          onChange={handleChange}
          value={content || ""}
        />
      </div>
      <div className="card-footer d-flex justify-content-end">
        {error && (
          <span className="form-control bg-transparent border-0 text-danger">{error}!</span>
        )}
        <button className="btn btn-primary">
          {loading ? (
            <div className="spinner-border spinner-border-sm text-primary">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : isFinite(data?.id) ? "Сохранить" : "Опубликовать"}
        </button>
      </div>
    </form>
  );
};

PostForm.propTypes = {
  data: Post.propTypes.data
};

export default PostForm;



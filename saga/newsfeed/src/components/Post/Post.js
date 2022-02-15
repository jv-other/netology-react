import React from "react";

import { PostPropTypes, PostAttachmentPropTypes } from "./propTypes";

/**
 * Заголовк поста: Автор и дата публикации
 * 
 * @component
 * @prop {PostPropTypes} post Данные поста 
 * 
 */
export const Header = ({ post }) => {
  const { author, postDate } = post;

  return (
    <div className="card-header d-flex flex-row">
      <div className="me-3">
        <img src={author.logo} alt={author.name} className="rounded-circle" />
      </div>
      <div className="flex-column">
        <div className="fw-bold text-primary">{author.name}</div>
        <div className="text-muted">{postDate}</div>
      </div>
    </div>
  );
};
Header.propTypes = { post: PostPropTypes };

/**
 * Вложение поста
 * 
 * @component
 * @prop {PostAttachmentPropTypes} attachment Данные вложения 
 *
 */
export const Attachment = ({ attachment }) => {

  // Видео
  if ("video" === attachment.type) {
    const { video } = attachment;
    return (<iframe width="100%" height={240} src={video.sourceUrl} frameBorder={0} />);
  }

  // Фото
  if ("photo" === attachment.type) {
    const { photo } = attachment;
    return (<img src={photo.sourceUrl} alt={photo.text} />);
  }

  // Ссылка
  if ("link" === attachment.type) {
    const { link } = attachment;
    return (
      <a href={link.url} target="_blank" rel="noreferrer noopener" className="text-decoration-none">
        {link.photo && (<img className="mw-100" src={link.photo.sourceUrl} alt={link.description} />)}
        <div className="flex-column p-2 ps-3">
          <div className="fw-bold">{link.title}</div>
          <div className="text-muted">{link.host}</div>
        </div>
      </a>
    );
  }

  console.warn("Unknown attachment type: ", item.type);
  return (
    <></>
  );
};
Attachment.propTypes = { attachment: PostAttachmentPropTypes };

/**
 * Лайки, комментарии, репосты и просмотры
 * 
 * @component
 * @prop {PostPropTypes} post Данные поста 
 *  
 */
export const Footer = ({ post }) => {
  const { likes, comments, reposts, viewsCount } = post;

  return (
    <div className="card-footer d-flex flex-row justify-content-start text-muted fs-6">
      <div className="p-2 me-2">
        <i className="fa-regular fa-heart me-1 fs-5"></i>
        {!!likes.count && likes.count}
      </div>
      <div className="p-2 me-2">
        <i className="fa-regular fa-message me-1 fs-5"></i>
        {!!comments.count && comments.count}
      </div>
      <div className="p-2">
        <i className="fa-solid fa-share me-1 fs-5"></i>
        {!!reposts.count && reposts.count}
      </div>
      <div className="p-2 ms-auto">
        <i className="fa-solid fa-eye me-1"></i>
        {viewsCount}
      </div>
    </div>
  );
};
Footer.propTypes = { post: PostPropTypes };

/**
 * Пост
 * 
 * @prop {PostPropTypes} post Данные поста 
 * 
 */
export const Post = ({ post }) => (
  <div className="card mb-4">
    <Header post={post} />
    <div className="card-body">
      <p className="card-text">
        {post.text}
      </p>
    </div>
    <div className="card mx-3 rounded-0">
      <ul className="list-group list-group-flush">
        {post.attachments.map((attachment, index) => (
          <li key={index} className="list-group-item p-0 border-0">
            <Attachment attachment={attachment} />
          </li>
        ))}
      </ul>
    </div>
    <Footer post={post} />
  </div>
);
Post.propTypes = { post: PostPropTypes };
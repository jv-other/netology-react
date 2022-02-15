import PropTypes from "prop-types";

export const PostAttachmentPropTypes = PropTypes.shape({
  /** Тип вложения */
  type: PropTypes.string.isRequired,
  /** Данные для видео */
  video: PropTypes.object,
  /** Данные для фото */
  photo: PropTypes.object,
  /** Данные для ссылки */
  link: PropTypes.object
});

export const PostPropTypes = PropTypes.shape({
  /** Post ID */
  id: PropTypes.number.isRequired,
  /** Author ID */
  from_id: PropTypes.number.isRequired,
  /** Owner ID */
  owner_id: PropTypes.number.isRequired,
  /** Дата публикации */
  date: PropTypes.number.isRequired,
  /** Текст поста */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Вложения */
  attachments: PropTypes.arrayOf(PostAttachmentPropTypes),
  /** Комментарии */
  comments: PropTypes.shape({
    count: PropTypes.number.isRequired
  }).isRequired,
  /** Лайки */
  likes: PropTypes.shape({
    count: PropTypes.number.isRequired
  }).isRequired,
  /** Репосты */
  reposts: PropTypes.shape({
    count: PropTypes.number.isRequired
  }).isRequired,
  /** Просмотры */
  views: PropTypes.shape({
    count: PropTypes.number.isRequired
  }).isRequired,
  // Дополнительно
  /** Данные автора */
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }),
  /** Форматированная дата публикации */
  postDate: PropTypes.string.isRequired,
  /** Количество тысяч просмотров */
  viewsCount: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]).isRequired
});
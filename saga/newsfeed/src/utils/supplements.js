import parse from "html-react-parser";

/**
 * Форматирует и добавляет дату поста
 * 
 * @function
 * @param {object} post 
 * @returns {object} post
 */
export const formatPostDate = (post) => {
  const date = new Date(post.date * 1000);
  const postDate = [
    date.toLocaleDateString("ru", { day: "numeric", month: "short" }).replace(/\./g, ""),
    "в",
    date.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })
  ].join(" ");
  return { ...post, postDate };
};

/**
 * Добавляет данные об авторе поста
 * (hardcode for sample)
 * 
 * @function
 * @param {object} post 
 * @returns {object} post 
 */
export const appendPostAuthor = (post) => ({
  ...post,
  author: {
    id: post.from_id,
    name: "Университет интернет-профессий Нетология",
    logo: "/logo.png"
  }
});

/**
 * Добавляет количество просмотров в виде {N}K, если просмотров больше 1000
 * 
 * @function
 * @param {object} post 
 * @returns {object} post
 */
export const wrapViews = (post) => ({
  ...post,
  viewsCount: ((1000 < (post.views?.count || 0))
    ? (Math.round(post.views.count / 100) / 10 + "K")
    : post.views?.count)
});

/**
 * Преобразует текст поста в html
 * 
 * @function
 * @param {object} post 
 * @returns {object} post
 */
export const transformText = (post) => ({
  ...post,
  text: parse(post.text.replace(/\.\s/, ".<br><br>"))
});

/**
 * Дополняет видео значением url для iframe
 * (hardcode for sample) 
 * 
 * @function
 * @param {object} video 
 * @returns {object} video
 */
export const takeVideoUrl = ({ video }) => ({
  ...video,
  sourceUrl: `https://vk.com/video_ext.php?oid=${video.owner_id}&id=${video.id}&hash=924f76b9087a3c8f`
});

/**
 * Дополняет изображение значением url для img
 * (random image for sample)
 * 
 * @function
 * @param {object} photo 
 * @returns {object} photo
 */
export const takePhotoUrl = ({ photo }) => ({
  ...photo,
  sourceUrl: `https://picsum.photos/600/400?_${(Math.random() * 100)}`
});

/**
 * Дополняет вложение данными в соответствии с типом
 * 
 * @function
 * @param {object} attachment 
 * @returns {object} attachment
 */
export const transformAttachment = (attachment) => {
  switch (attachment.type) {
    case "video":
      return { ...attachment, video: takeVideoUrl(attachment) };
    case "photo":
      return { ...attachment, photo: takePhotoUrl(attachment) };
    case "link":
      const { link } = attachment;
      return {
        ...attachment, link: {
          ...link,
          host: link.url.replace(/^.*\/\/(.*?)\/.*$/, "$1"),
          photo: (link.photo ? takePhotoUrl(link) : undefined),
        }
      };
    default:
      console.warn("Unknown attachment type:", attachment);
      return attachment;
  }
};

/**
 * Дополняет данными вложения поста
 * 
 * @function
 * @param {object} post 
 * @returns {object} post 
 */
export const transformAttachments = (post) => ({
  ...post,
  attachments: post.attachments.map(transformAttachment)
});
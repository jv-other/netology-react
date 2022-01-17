/**
 * Chat API
 * @class
 */
class ChatAPI {

  /**
   * @constructor
   * @param {string} apiUrl Chat server URL 
   */
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  /**
   * Загрузка сообщений
   * 
   * @param {number} lastId Идентификатор последнего полученного сообщения
   * @returns {Promise<Object[]>} Promise списка сообщений
   */
  async list(lastId) {
    const loadUrl = new URL(this.apiUrl);

    loadUrl.searchParams.set("from", lastId || 0);

    return window.fetch(loadUrl, {
      method: "GET"
    }).then(response => response.json());
  }

  /**
   * Отправка сообщения
   * 
   * @param {string} userId Идентификатор пользователя 
   * @param {string} message Текст сообщения
   * @returns {Promise} promise response
   */
  async send(userId, message) {
    return window.fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 0, userId: userId, content: message })
    });
  }

}

export default ChatAPI;
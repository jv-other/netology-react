
/**
 * Notes API
 * @class
 */
class NotesAPI {

  /**
   * @constructor
   * @param {string} apiUrl Notes server URL 
   */
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  /**
   * Получение списка заметок
   * 
   * @returns {Promise<Object[]>} Список заметок
   */
  async list() {
    return window.fetch(this.apiUrl, {
      method: "GET"
    }).then(response => response.json());
  }

  /**
   * Добавить новую заметку
   * 
   * @param {string} content Текст новой заметки
   * 
   * @returns {Promise} promise response
   */
  async add(content) {
    return window.fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 0, content: content })
    });
  }

  /**
   * Удалить существующую заметку
   * 
   * @param {number} noteId Идентификатор заметки 
   * @returns {Promise} promise response
   */
  async remove(noteId) {
    return window.fetch(`${this.apiUrl}/${noteId}`, {
      method: "DELETE"
    });
  }

}

export default NotesAPI;
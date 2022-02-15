/**
 * API url
 * @constant
 * 
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Поиск
 * 
 * @function
 * @param {string} query Строка поиска 
 * @returns {object[]} Список найденных записей
 */
export const search = async (query) => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${API_URL}/search?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

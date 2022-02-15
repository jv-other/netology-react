
/**
 * API url
 * @constant
 * 
 */
 const API_URL = process.env.REACT_APP_API_URL;

 /**
  * Запрос к API
  * 
  * @param {string} resource API resource 
  */
 export const fetch = async (resource) => {
   const response = await window.fetch([API_URL, resource].join("/"));
   if (!response.ok) {
     throw new Error(response.statusText);
   }
   return await response.json();
 };
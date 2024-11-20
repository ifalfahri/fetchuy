const cache = {};

/**
 * Simple cache system to store API responses.
 * @param {string} key - The key for the cache.
 * @param {function} fetchFn - The function that fetches data.
 * @returns {Promise<any>} Cached data or fetched data.
 */
export const useCache = (key, fetchFn) => {
  if (cache[key]) {
    return Promise.resolve(cache[key]);
  }

  return fetchFn().then((data) => {
    cache[key] = data;
    return data;
  });
};
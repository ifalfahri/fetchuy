/**
 * Retry a fetch request for a certain number of times.
 * @param {function} fetchFn - The fetch function to retry.
 * @param {number} retries - The number of retries before failing.
 * @param {number} delay - The delay between retries in milliseconds.
 * @returns {Promise<any>} The data after the successful request or an error.
 */
export const retryFetch = async (fetchFn, retries = 3, delay = 1000) => {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchFn();
      } catch (error) {
        lastError = error;
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    throw lastError;
  };
  
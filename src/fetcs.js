/**
 * Reusable fetch function for making HTTP requests.
 * @param {string} url - The URL to send the request to.
 * @param {object} options - The configuration options for the request.
 * @returns {Promise<object>} The response data in JSON format.
 */
export const fetcho = async (url, options = {}) => {
    const defaultOptions = {
      method: 'GET',  // Default method is GET
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Merge user options with defaults
    const finalOptions = { ...defaultOptions, ...options };
  
    try {
      const response = await fetch(url, finalOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Return response data
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
  
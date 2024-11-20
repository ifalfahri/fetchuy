import { useState, useEffect } from "react";
import { fetcho } from "./fetcho";

/**
 * Custom React hook for fetching data.
 * @param {string} url - The URL to fetch data from.
 * @param {object} options - Additional fetch options.
 * @returns {object} - Contains data, error, and loading state.
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetcho(url, options); // Use fetchs function
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
};

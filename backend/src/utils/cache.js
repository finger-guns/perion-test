/** @type {Object<string, any>} */
const cache = {};

/**
 * Retrieves data from the cache using a key.
 * @param {string} key - The cache key.
 * @returns {any} The cached data or undefined if not found. YUCKY
 */
const getFromCache = (key) => cache[key];

/**
 * Stores data in the cache with an optional time-to-live (TTL).
 * @param {string} key - The cache key.
 * @param {any} value - The data to cache.
 * @param {number} [ttl=300000] - Time-to-live in milliseconds (default: 5 minutes).
 */
const setInCache = (key, value, ttl = 300000) => {
  cache[key] = value;
  setTimeout(() => delete cache[key], ttl);
};

module.exports = {
  getFromCache,
  setInCache
};

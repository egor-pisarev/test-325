const DEFAULT_CACHE_EXPIRE = 5;

let pendings = {};

const asyncRedis = require("async-redis");
const cache = asyncRedis.createClient();

module.exports = {
  set: cache.set,
  getOrSet: async function (key, prom, expire) {

    if (cache.get(key)) {
      return cache.get(key);
    }

    const result = await prom;

    cache.set(key, JSON.stringify(result), 'EX', expire);

    return result;
  },
  getOrPending: async function (cacheKey, promise, cacheExpired) {

    if (cacheExpired === undefined) {
      cacheExpired = DEFAULT_CACHE_EXPIRE;
    }

    let cacheResult = await cache.get(cacheKey);

    if (cacheResult !== undefined && cacheResult !== null) {
      return JSON.parse(cacheResult);
    }

    if (pendings[cacheKey]) {
      return pendings[cacheKey];
    }

    return pendings[cacheKey] = promise().then(result => {

      pendings[cacheKey] = undefined;

      if (result !== undefined) {
        cache.set(cacheKey, JSON.stringify(result), 'EX', cacheExpired);
      }
      return result;
    }).catch(err => {
      pendings[cacheKey] = undefined;
      throw err;
    });

  }
};
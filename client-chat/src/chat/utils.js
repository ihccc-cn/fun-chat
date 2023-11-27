const isString = (e) => typeof e === "string";
const isArray = (e) => Array.isArray(e);

/**
 * 保存字符串数据到本地
 * @param {string} key - 键
 * @param {any} value - 值
 */
export const setStorage = (key, value) => {
  if (!isString(value) && value !== void 0) {
    value = JSON.stringify(value);
  }
  return window.localStorage.setItem(key, value);
};

/**
 * 获取转换后的本地缓存，如果不存在，返回默认值
 * @param {string} key - 本地缓存的键值名称
 * @param {any} defaultValue - 默认值
 */
export const getStorage = (key, defaultValue = "") => {
  let storage = window.localStorage.getItem(key);
  if (isString(storage)) {
    try {
      return JSON.parse(storage);
    } catch (e) {
      return isString(defaultValue) ? storage : defaultValue;
    }
  } else if (storage === null) {
    return defaultValue;
  }
  return storage;
};

/**
 * 删除指定key值的缓存
 * @param {string|array|undefined} keys - 本地缓存的键值名称，字符串和数组，删除单个或多个，不传删全部
 * @param {boolean} includes - 删除项是否在 keys 内
 */
export const removeStorage = (keys, includes = true) => {
  if (isString(keys)) {
    window.localStorage.removeItem(keys);
  } else if (isArray(keys)) {
    if (includes) {
      keys.forEach((key) => window.localStorage.removeItem(key));
    } else {
      Object.keys(window.localStorage).forEach((key) => {
        if (!keys.includes(key)) window.localStorage.removeItem(key);
      });
    }
  } else {
    window.localStorage.clear();
  }
};

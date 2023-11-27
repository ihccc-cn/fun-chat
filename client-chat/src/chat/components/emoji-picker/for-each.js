/**
 * 支持 Promise 的 forEach
 * @param {array} array
 * @param {function} callback
 * @param {number} start
 * @returns
 */
export const forEachPromised = (array, callback, start = 0) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) return reject();
    const results = [];
    function loop(index) {
      if (index >= array.length) return resolve(results);

      const item = array[index];
      const next = () => loop(index + 1);

      if (typeof callback === "function") {
        callback(item, index)
          .then((res) => {
            results.push(res);
            next();
          })
          .catch(reject);
      } else {
        next();
      }
    }

    loop(start);
  });
};

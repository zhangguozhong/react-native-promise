

/**
 * 串行执行Promise
 * @param fnPromises 函数集合（返回值promise）
 * @param cb 回调函数
 * @param args 第一个promise的参数
 * @returns {Promise.<>}
 */
const sequence = (fnPromises,cb,...args) => {
    const promise = Promise.resolve();
    //fnPromises不是数组或者数组的长度等于0
    if (!Array.isArray(fnPromises)||fnPromises.length === 0) {
        return promise;
    }

    //如果cb不是函数
    if (typeof cb !== 'function') {
        cb = null;
        args = { cb, ...args };
    }
    
    let currentIndex = 0;
    function nextPromise(...params) {
        return promise.then(() => {
            return fnPromises[currentIndex](...params);
        }).then(r => {

            ++currentIndex;
            cb && cb(r);
            return currentIndex === fnPromises.length ? Promise.resolve(r) : nextPromise(...r);

        }).catch(error => {
            throw error;
        });
    }

    return nextPromise(...args);
};

const runPromisesInSeries = {
    sequence
};

export default runPromisesInSeries;
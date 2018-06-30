

/**
 * 串行执行Promise
 * @param promises 函数集合（返回值promise）
 * @param cb 回调函数
 * @param args 第一个promise的参数
 * @returns {Promise.<>}
 */
const sequence = (promises,cb,...args)=>{

    const promise = Promise.resolve();
    if (tasks.length <= 0){
        return promise;
    }

    if (typeof cb !== 'function'){
        cb = null;
        args = { cb, ...args };
    }
    
    let currentIndex = 0;
    function nextPromise(...params){

        return promise.then(() => {
            return promises[currentIndex](...params);
        }).then(r => {

            ++currentIndex;
            cb && cb(r);
            return currentIndex >= promises.length ? Promise.resolve(r): nextPromise(...r);

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
# react-native-promise

## Usage

```javascrpt

import runPromisesInSeries from 'react-native-promise'

const p1 = ()=>{
    return new Promise((resolve,reject)=>{
        resolve('测试常见的Promise用法');
    }).then(r=>{
        return r;
    }).catch(error=>{
        console.log('error'+error);
    });
};

const p2 = ()=>{
    return new Promise((resolve,reject)=>{
        resolve('测试常见的Promise用法，串行执行');
    }).then(r=>{
        return r;
    }).catch(error=>{
        console.log('error'+error);
    });
};

try {
    runPromisesInSeries.sequence([p1,p2],(r)=>{
        console.log('call back value == '+r);
    },{a:1,b:2}).then(r=>{
        console.log('result==='+r);
    });
} catch (err) {
}

```end

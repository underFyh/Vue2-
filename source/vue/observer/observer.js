import { observer } from "./index"
import { newArrayProto, observerArray } from './array';
import Dep from './dep';

// 数据添加响应式
export function definedReactive(data, key, value) {
    // 递归给属性进行数据劫持
    observer(value);
    // 每个值实现响应式的时候都挂载dep依赖
    let dep = new Dep();

    Object.defineProperty(data, key, {
        get() {
            console.log('get执行', key);
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return value;
        },
        set(newVal) {
            if (newVal === value) return;
            // 如果新值也是对象则进行数据劫持
            observer(newVal);
            // console.log('set执行', newVal);
            value = newVal;
            // 发布
            dep.notify();
        }
    })
}

// 给数据添加setter getter
class Observer {
    constructor(data) {
        if (Array.isArray(data)) {
            data.__proto__ = newArrayProto;
            // 观察数组
            observerArray(data);
        } else {
            this.walk(data);
        }
    }
    walk(data) {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i],
                value = data[key];
            definedReactive(data, key, value);
        }
    }
}

export default Observer;

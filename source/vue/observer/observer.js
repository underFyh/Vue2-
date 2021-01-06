import { observer } from "./index"
import { newArrayProto, observerArray, dependArray } from './array';
import Dep from './dep';

// 数据添加响应式
export function definedReactive(data, key, value) {
    // 递归给属性进行数据劫持, 如果是对象或者数组则有返回new Observe()
    let childOb = observer(value);
    // 每个值实现响应式的时候都挂载dep依赖
    let dep = new Dep();

    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                // todo: 此时会加入重复的watcher update方法可以去除重复的watcher操作
                dep.depend();

                if (childOb) {
                    childOb.dep.depend(); // 给数组添加上依赖

                    // 递归处理多维数组
                    dependArray(value); // [[1], 2];
                }
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
        console.log(data);
        // 数组依赖收集
        this.dep = new Dep();
        Object.defineProperty(data, '__ob__', {
            get:() => this  // 实例保存到data '__ob__'中
        })

        if (Array.isArray(data)) {
            console.log('数组');
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

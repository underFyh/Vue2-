// 创建原型赋值给data
import { observer } from "./index"

// 数组方法的参数都是数组
export function observerArray(insertElement) {
    for (let i = 0; i < insertElement.length; i++) {
        // 观察新增元素 如果是对象则会进行劫持
        observer(insertElement[i]);
    }
}


let oldArrayProto = Array.prototype;
let newArrayProto = Object.create(oldArrayProto);

let methods = ['push', 'shift', 'unshift', 'pop', 'splice', 'sort', 'reverse'];

methods.forEach(method => {
    newArrayProto[method] = function (...args) {
        let result = oldArrayProto[method].apply(this, args);
        console.log('使用了自定义数组方法')
        // 新增项都添加响应
        let insertedElement;

        switch (method) {
            case 'push':
            case 'unshift':
                insertedElement = args;
                break;
            case 'splice':
                // splice也可以添加一项
                insertedElement = args.slice(2);
                break;
            default:
                break;
        }

        if (insertedElement) {
            observerArray(insertedElement);
        }

        return result;
    }
})


export { newArrayProto }

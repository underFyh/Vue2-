// 数据添加响应式
export function definedReactive(data, key, value) {
    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newVal) {
            if (newVal === value) return;
            value = newVal;
        }
    })
}

// 给数据添加setter getter
class Observer {
    constructor(data) {
        this.walk(data);
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

import Observer from "./observer"

export function initState(vm) {
    let $option = vm.$options;
    if ($option.data) {
        initData(vm);
    }
    if ($option.computed) {

    }
    if ($option.watch) {
        initWatch(vm);
    }
}

function proxy(vm, source, key) {
    // data 保存在了 vm._data 中
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key];
        },
        set(newVal) {
            vm[source][key] = newVal;
        }
    })
}

// 尽量保持参数一致
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    // 循环添加属性
    for (let key in data) {
        proxy(vm,'_data',key);
    }
    observer(vm._data);
}

function initWatch(vm) {
    let watch = vm.$options.watch;
    for(let key in watch) {
        let handler = watch[key];
        createWatcher(vm, key, handler);
    }
}


function createWatcher(vm, key, handler) {
    return vm.$watch(key, handler)

}


export function observer(data) {
    if (typeof data !== 'object' || data === null) {
        return;
    }

    if (data.__ob__) {  // 数组则无需重复添加依赖
        return data.__ob__
    }

    return new Observer(data);
}

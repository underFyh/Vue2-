import Observer from "./observer"

export function initState(vm) {
    let $option = vm.$options;
    if ($option.data) {
        initData(vm);
    }
    if ($option.computed) {

    }
    if ($option.watch) {

    }
}

function proxy(vm, key, source) {
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
        proxy(vm, key, '_data');
    }
    observer(vm._data);
}


export function observer(data) {
    if (typeof data !== 'object' || data === null) {
        return;
    }
    return new Observer(data);
}

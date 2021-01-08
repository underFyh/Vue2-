import { pushTarget, popTarget } from './dep'
import { getValue } from '../tools';

// 保证每个实例化的组件唯一id
let vmId = 0;

class Watcher {
    constructor(vm, expOrFn, cb = () => {}, opts = {}) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            // 用户自定义watcher
            this.getter = function () {
                return getValue(expOrFn, vm); // message
            }
        }
        if (opts.user) {
            this.user = true;
        }

        this.cb = cb;
        this.opts = opts;
        this.id = vmId ++;
        this.deps = [];
        this.depsId = new Set();

        this.value = this.get();
        this.get();
    }

    get() {
        debugger;
        pushTarget(this);
        // watcher 保存老值
        let value = this.getter();
        popTarget();
        return value;
    }

    run() {
        // 获取新值
        // this.get();
        let value = this.get();
        if (this.value !== value) {
            // 新值  旧值
            this.cb(value, this.value);
        }
    }

    // watcher 和 dep相互依赖 去除重复的watcher
    addDep(dep) {
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);

            // 同时也将watcher存入dep中
            dep.addSub(this);
        }
    }

    update() {
        // 避免多次compiler逻辑
        // this.get();
        queueWatcher(this);
    }
}

// 判断队列
let has = {};
let queue = [];

function queueWatcher(watcher) {
    let id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        // 此时只有一个id = 0 的watcher
        queue.push(watcher);

        // 使用异步执行
        nextTick(flushQueue);
    }
}

function flushQueue() {
    queue.forEach(watcher => watcher.run());
    has = {};
    queue = [];
}

// nextTick逻辑
let callbacks = []
function flushCallbacks() {
    callbacks.forEach(cb => cb());
}
function nextTick(cb) {
    callbacks.push(cb);
    let timerFunction = () => {
        flushCallbacks();
    }

    if (Promise) {
        return Promise.resolve().then(timerFunction);
    }

    if (MutationObserver) {
        let observe = new MutationObserver(timerFunction);
        let textNode = document.createTextNode(10);
        observe.observe({ characterData: true });
        textNode.textContent = 20;
        return ;
    }

    if (setImmediate) {
        return  setImmediate(timerFunction);
    }

    setTimeout(timerFunction, 0);
}

export default Watcher;

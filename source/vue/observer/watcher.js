// 保证每个实例化的组件唯一id
let vmId = 0;

class Watcher {
    constructor(vm, expOrFn, cb = () => {}, opts = {}) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.opts = opts;
        this.id = vmId ++;
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        }
        this.get();
    }

    get() {
        this.getter();
    }
}

export default Watcher;

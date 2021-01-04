import { pushTarget, popTarget } from './dep'

// 保证每个实例化的组件唯一id
let vmId = 0;

class Watcher {
    constructor(vm, expOrFn, cb = () => {}, opts = {}) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.opts = opts;
        this.id = vmId ++;
        this.deps = [];
        this.depsId = new Set();
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        }
        this.get();
    }

    get() {
        pushTarget(this);
        this.getter();
        popTarget();
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
        // todo: 待写更新逻辑
        console.log(1)
    }
}

export default Watcher;

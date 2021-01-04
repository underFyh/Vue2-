let id = 0;

class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }

    // 订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }

    // 发布
    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }

    // 把watcher存入dep.subs中 把dep存入到watcher中 多对多关系
    depend() {
        if (Dep.target) {
            // watcher 添加 dep
            Dep.target.addDep(this);
        }
    }
}

let stack = [];

export function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
}

export function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
}

export default Dep;

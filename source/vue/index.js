import { initState } from "./observer";
import Watcher from "./observer/watcher"
import { compiler } from './tools';

function Vue(options) {
    let vm = this;
    vm.$options = options;
    this._init(vm);
}

Vue.prototype._init = function (vm) {
    initState(vm);
    if (vm.$options.el) {
        vm.$mount();
    }
}

// 编辑文本  确定执行时间
Vue.prototype.$mount = function () {
    let vm = this;
    let el = vm.$options.el;
    el = vm.$el = query(el);
    let updateComponent = () => {
        vm._update();
    }

    new Watcher(vm, updateComponent);
}

Vue.prototype._update = function () {
    console.log('upDate')
    let vm = this,
        el = vm.$el,
        NodeList = document.createDocumentFragment();
    while (el.firstChild) {
        NodeList.appendChild(el.firstChild);
    }
    // 编译文本
    compiler(NodeList, vm);

    el.appendChild(NodeList);
}


// query 判断是否是一个dom
function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el);
    }
    return el;
}

export default Vue;

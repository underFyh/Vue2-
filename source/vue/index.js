import { initState } from "./observer";

function Vue(options) {
    let vm = this;
    vm.$options = options;
    this._init(vm);
}

Vue.prototype._init = function (vm) {
    initState(vm);
}


export default Vue;

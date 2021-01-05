import Vue from 'vue';

let vm = new Vue({
    el: '#app',
    data() {
        return {
            message: 'JS++',
            arr: [1, 2, 3],
            obj: {name: 'fyh', sex: '男'}
        }
    },
    computed() {

    },
    watch: {

    }
})


setTimeout(() => {
    // 模拟更新视图
    vm._data.message = 'NodeJs'
    vm._data.message = 'Koa2'
    vm._data.message = 'TypeScript'
}, 3000);



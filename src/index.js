import Vue from 'vue';

let vm = new Vue({
    el: '#app',
    data() {
        return {
            message: 'JS++',
            arr: [[[1],], 2, 3],
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
    vm._data.arr[0][0].push(4)

}, 3000);



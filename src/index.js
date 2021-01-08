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
        message: function (newValue, oldValue) {
            console.log(newValue, oldValue);
        }
    }
})


// setTimeout(() => {
//     // 模拟更新视图
//     vm.message = 'node';
//
// }, 3000);



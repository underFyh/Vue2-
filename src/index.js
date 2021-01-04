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
    vm._data.message = 'NodeJs'
}, 2000);



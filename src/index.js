import Vue from 'vue';

let vm = new Vue({
    el: '#app',
    data() {
        return {
            message: 'JS',
            arr: [1, 2, 3],
            obj: { a: 1, b: 2 }
        }
    },
    computed() {

    },
    watch: {

    }
})

vm.arr.push(55);




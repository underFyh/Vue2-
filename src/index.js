import Vue from 'vue';

let Vm = new Vue({
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

Vm._data.arr[0] = 44;
console.log(Vm.arr)

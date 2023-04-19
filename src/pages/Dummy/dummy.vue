<template>
    <div class="fit column no-wrap">
        <page-content>
            <div class="custom-container">
                <div class="flexInp">
                    <div >
                        <input v-model="name">
                    </div>
                    <button @click.prevent="btnAdd" class="inpBtn" alert=" true">Add</button>
                </div>
                <p v-for="(txt, index) in data">
                    {{ txt }} <button @click.prevent="btnDel(index)">Delete</button>
                    <button @click.prevent="btnDelAll()">Delete All</button>
                </p>
                <p>List</p>
                <div v-for="(listItem, i) in list" :key="i">
                    <input v-model="listItem.a">
                </div>
                <button @click="addList">
                    Add New List
                </button>
                <div class="quizApp">
                    <div class="quiz">
                        <p>sd</p>
                    </div>
                </div>
            </div>
        </page-content>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            // msg: 'Please enter somthing to add ToDo',
            name: '',
            data: [],
            list: [{ a: 'Hello World!' }]
        }
    },
    methods: {
        btnEvent(e: MouseEvent) {
            // alert(`HI ${this.msg}`)
            // console.log('my event', e)
            if (e) {
                // alert(e.target.tagName)
                alert(`${this.alert}`)
                console.log('if event', e)
            }
        },
        btnAdd: function () {
            if (this.name === '') {
                alert('Enter something')
            } else {
                this.data.push(this.name)
                this.name = ''
            }
            console.log('this name', this.name)
        },
        btnDel: function (index) {
            this.data.splice(index)
        },
        btnDelAll: function () {
            this.data.splice(this.name)
        },
        addList: function () {
            this.list.push({ a: 'Hello World!' })
        }
    }
})
</script>

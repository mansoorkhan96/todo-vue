<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="finishEdit">
            <div v-if="! editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed : completed }">{{ title }}</div>
            <input v-focus @blur="finishEdit" @keyup.enter="finishEdit" @keyup.esc="cancelEdit" v-else class="todo-item-edit" type="text" v-model="title">
        </div>
        <div>
            <button @click="pluralize">Plural</button>
            <span class="remove-item" @click="removeTodo(id)">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            completed: this.todo.completed,
            editing: this.todo.editing,
            beforeEditCache: '',
        }
    },
    created() {
        eventBus.$on('pluralize', this.handlePluralize)
    },
    beforeDestroy() {
        eventBus.$off('pluralize', this.handlePluralize)
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed
        }
    },
    directives: {
        focus: {
            inserted: function(el) {
                el.focus()
            }
        }
    },
    methods: {
        removeTodo(id) {
            this.$store.dispatch('removeTodo', id)
        },
        editTodo() {
            this.beforeEditCache = this.title
            this.editing = true
        },
        finishEdit() {
            if(this.title.trim() == '') {
                this.title = this.beforeEditCache
            }
            this.editing = false

            this.$store.dispatch('updateTodo', {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            })
        },
        cancelEdit() {
            this.title = this.beforeEditCache
            this.editing = false
        },
        pluralize() {
            eventBus.$emit('pluralize')
        },
        handlePluralize() {
            this.title = this.title + 's'

            const index = this.$store.state.todos.findIndex(item => item.id == this.id)
            this.$store.state.todos.splice(index, 1, {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing,
            })
        },
    }
}
</script>
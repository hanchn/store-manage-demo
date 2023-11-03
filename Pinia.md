这是一个使用 Vue 3 和 Pinia 的简单的待办事项列表示例。首先，我们需要安装必要的依赖项：

```bash
npm install vue@next pinia@next
```

然后，我们可以创建一个新的 Pinia store 来管理我们的待办事项列表：

```javascript
// src/store/todos.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
});
```

接下来，我们可以在 Vue 组件中使用这个 store：

```vue
<!-- src/App.vue -->
<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addTodo">
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="removeTodo(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoStore } from './store/todos';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    const addTodo = () => {
      todoStore.addTodo(newTodo.value);
      newTodo.value = '';
    };

    const removeTodo = index => {
      todoStore.removeTodo(index);
    };

    return {
      todos: todoStore.todos,
      newTodo,
      addTodo,
      removeTodo
    };
  }
};
</script>
```

这个示例中，我们创建了一个简单的待办事项列表，可以添加和删除待办事项。我们使用了 Vue 3 的 Composition API 和 Pinia 来管理状态。希望这个示例对你有所帮助！
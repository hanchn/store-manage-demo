这是一个使用 Vue 3 和 Vuex 的简单的待办事项列表示例。首先，我们需要安装必要的依赖项：

```bash
npm install vue@next vuex@next
```

然后，我们可以创建一个新的 Vuex store 来管理我们的待办事项列表：

```javascript
// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('addTodo', todo);
    },
    removeTodo({ commit }, index) {
      commit('removeTodo', index);
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
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const newTodo = ref('');

    const addTodo = () => {
      store.dispatch('addTodo', newTodo.value);
      newTodo.value = '';
    };

    const removeTodo = index => {
      store.dispatch('removeTodo', index);
    };

    return {
      todos: store.state.todos,
      newTodo,
      addTodo,
      removeTodo
    };
  }
};
</script>
```

这个示例中，我们创建了一个简单的待办事项列表，可以添加和删除待办事项。我们使用了 Vue 3 的 Composition API 和 Vuex 来管理状态。希望这个示例对你有所帮助！
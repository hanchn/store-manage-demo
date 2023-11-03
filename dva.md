这是一个基于React和dva的TodoList应用的示例代码：

```jsx
import dva, { connect } from 'dva';
import React from 'react';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'todos',
  state: [],
  reducers: {
    add(state, { payload: text }) {
      return [...state, { text }];
    },
    remove(state, { payload: index }) {
      return state.filter((_, i) => i !== index);
    },
  },
});

// 3. View
const App = connect(({ todos }) => ({
  todos,
}))(({ todos, dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch({ type: 'todos/add', payload: input.value });
          input.value = '';
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button onClick={() => dispatch({ type: 'todos/remove', payload: index })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');
```

这个示例包括一个`App`组件，它显示了一个待办事项列表。每个待办事项都有一个文本和一个删除按钮。我们使用dva的`model`来创建一个模型，该模型管理待办事项列表的状态。我们使用`reducers`来定义如何更新状态，并使用`dispatch`来触发这些更新。

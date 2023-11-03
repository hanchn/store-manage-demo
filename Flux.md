这是一个基于React和Flux的TodoList应用的完整示例代码，包括了动作（Actions）、存储（Store）和视图（View）：

```jsx
// Actions.js
const TodoActions = {
  add: 'ADD_TODO',
  remove: 'REMOVE_TODO',
};

// Dispatcher.js
import { Dispatcher } from 'flux';
export default new Dispatcher();

// Store.js
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import TodoActions from './Actions';

class TodoStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActions.add:
        return [...state, { text: action.text }];
      case TodoActions.remove:
        return state.filter((_, i) => i !== action.index);
      default:
        return state;
    }
  }
}

export default new TodoStore();

// View.js
import React from 'react';
import { Container } from 'flux/utils';
import TodoStore from './Store';
import TodoActions from './Actions';
import Dispatcher from './Dispatcher';

class TodoList extends React.Component {
  static getStores() {
    return [TodoStore];
  }

  static calculateState(prevState) {
    return {
      todos: TodoStore.getState(),
    };
  }

  render() {
    return (
      <div>
        <input type="text" ref={(node) => (this.input = node)} />
        <button onClick={this.addTodo}>Add</button>
        {this.state.todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button onClick={() => this.removeTodo(index)}>Remove</button>
          </li>
        ))}
      </div>
    );
  }

  addTodo = () => {
    Dispatcher.dispatch({
      type: TodoActions.add,
      text: this.input.value,
    });
    this.input.value = '';
  };

  removeTodo = (index) => {
    Dispatcher.dispatch({
      type: TodoActions.remove,
      index,
    });
  };
}

export default Container.create(TodoList);
```

这个示例包括一个`TodoList`组件，它显示了一个待办事项列表。每个待办事项都有一个文本和一个删除按钮。我们使用Flux的`Container`，`Dispatcher`，`TodoActions`和`TodoStore`来管理待办事项列表的状态。

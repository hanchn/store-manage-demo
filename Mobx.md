当然，这是一个基于React和MobX的简单的TodoList应用的示例。这个应用将允许用户添加新的待办事项，标记待办事项为已完成，以及删除待办事项。

首先，我们需要安装必要的依赖项：

```bash
npm install --save react mobx mobx-react
```

然后，我们可以开始编写我们的应用。这是一个简单的文件结构：

```plaintext
/src
  /models
    Todo.js
    TodoList.js
  /components
    TodoView.js
    TodoListView.js
    AddTodo.js
  index.js
  App.js
```

在`models/Todo.js`中，我们定义了我们的Todo模型：

```javascript
import { observable } from 'mobx';

export default class Todo {
  id = Math.random();
  @observable text = '';
  @observable completed = false;

  constructor(text) {
    this.text = text;
  }
}
```

在`models/TodoList.js`中，我们定义了我们的TodoList模型：

```javascript
import { observable, action } from 'mobx';
import Todo from './Todo';

export default class TodoList {
  @observable todos = [];

  @action
  addTodo(text) {
    this.todos.push(new Todo(text));
  }

  @action
  removeTodo(todo) {
    this.todos.remove(todo);
  }
}
```

在`components/TodoView.js`和`components/TodoListView.js`中，我们定义了我们的React组件：

```javascript
// TodoView.js
import React from 'react';
import { observer } from 'mobx-react';

const TodoView = observer(({ todo, removeTodo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => (todo.completed = !todo.completed)}
    />
    {todo.text}
    <button onClick={() => removeTodo(todo)}>Delete</button>
  </li>
));

export default TodoView;
```

```javascript
// TodoListView.js
import React from 'react';
import { observer } from 'mobx-react';
import TodoView from './TodoView';

const TodoListView = observer(({ todoList }) => (
  <ul>
    {todoList.todos.map(todo => (
      <TodoView key={todo.id} todo={todo} removeTodo={todoList.removeTodo} />
    ))}
  </ul>
));

export default TodoListView;
```

在`components/AddTodo.js`中，我们定义了我们的AddTodo组件：

```javascript
import React, { Component } from 'react';

class AddTodo extends Component {
  state = { text: '' };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleAddClick = () => {
    this.props.addTodo(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.handleTextChange} />
        <button onClick={this.handleAddClick}>Add Todo</button>
      </div>
    );
  }
}

export default AddTodo;
```

最后，在`App.js`中，我们将所有的东西连接起来：

```javascript
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TodoList from './models/TodoList';
import TodoListView from './components/TodoListView';
import AddTodo from './components/AddTodo';

const store = new TodoList();

@observer
class App extends Component {
  render() {
    return (
      <div>
        <AddTodo addTodo={store.addTodo.bind(store)} />
        <TodoListView todoList={store} />
      </div>
    );
  }
}

export default App;
```

当然，这是一个基于React和Redux的简单的TodoList应用的示例。这个应用将允许用户添加新的待办事项，标记待办事项为已完成，以及删除待办事项。

首先，我们需要安装必要的依赖项：

```bash
npm install --save react redux react-redux
```

然后，我们可以开始编写我们的应用。这是一个简单的文件结构：

```plaintext
/src
  /actions
    index.js
  /reducers
    index.js
    todos.js
  /components
    Todo.js
    TodoList.js
    AddTodo.js
  index.js
  App.js
```

在`actions/index.js`中，我们定义了我们的动作类型和动作创建函数：

```javascript
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

let nextTodoId = 0;

export const addTodo = text => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});
```

在`reducers/todos.js`中，我们定义了一个处理这些动作的reducer：

```javascript
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions';

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export default todos;
```

在`reducers/index.js`中，我们组合了所有的reducer：

```javascript
import { combineReducers } from 'redux';
import todos from './todos';

export default combineReducers({
  todos
});
```

在`components/Todo.js`，`components/TodoList.js`和`components/AddTodo.js`中，我们定义了我们的React组件：

```javascript
// Todo.js
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
```

```javascript
// TodoList.js
import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo(todo.id)}
      />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
```

```javascript
// AddTodo.js
import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ addTodo }) => {
  let input;

  return (
    <div>
      <input ref={node => { input = node; }} />
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;
```

最后，在`App.js`中，我们将所有的东西连接起来：

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './actions';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const App = ({ todos, addTodo, toggleTodo, deleteTodo }) => (
  <div>
    <AddTodo addTodo={addTodo} />
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
  </div>
);

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch(addTodo(text)),
  toggleTodo: id => dispatch(toggleTodo(id)),
  deleteTodo: id => dispatch(deleteTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```

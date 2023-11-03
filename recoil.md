这是一个基于React和Recoil的TodoList应用的示例代码：

```jsx
import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

const todoListCountState = selector({
  key: 'todoListCountState',
  get: ({get}) => {
    const todoList = get(todoListState);
    return todoList.length;
  },
});

function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function TodoList() {
  const todoList = useRecoilValue(todoListState);
  const todoListCount = useRecoilValue(todoListCountState);

  return (
    <>
      <h3>Todo List</h3>
      <p>Total items: {todoListCount}</p>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default TodoList;
```

这个示例包括一个`TodoList`组件，它显示了一个待办事项列表。每个`TodoItem`都有一个文本输入框和一个删除按钮。我们使用Recoil的`atom`和`selector`来管理状态。`todoListState`是一个atom，它存储了待办事项列表的状态。`todoListCountState`是一个selector，它计算了待办事项的数量。我们使用`useRecoilState`和`useRecoilValue`来读取和写入这些状态。

这是一个基于React和Hox的TodoList应用的示例代码：

```jsx
import React, { useState } from 'react';
import { createContainer } from 'unstated-next';

function useTodoList() {
  let [list, setList] = useState([]);
  let add = (text) => setList([...list, { text }]);
  let remove = (index) => setList(list.filter((_, i) => i !== index));
  return { list, add, remove };
}

let TodoListContainer = createContainer(useTodoList);

function TodoList() {
  let todoList = TodoListContainer.useContainer();
  let [text, setText] = useState('');

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => { todoList.add(text); setText(''); }}>Add</button>
      {todoList.list.map((item, index) => (
        <div key={index}>
          {item.text}
          <button onClick={() => todoList.remove(index)}>X</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <TodoListContainer.Provider>
      <TodoList />
    </TodoListContainer.Provider>
  );
}

export default App;
```

这个示例包括一个`TodoList`组件，它显示了一个待办事项列表。每个待办事项都有一个文本和一个删除按钮。我们使用Hox的`createContainer`来创建一个容器，该容器管理待办事项列表的状态。我们使用`useState`来存储待办事项列表的状态，并提供添加和删除待办事项的函数。

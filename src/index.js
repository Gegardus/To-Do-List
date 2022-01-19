import './style.css';
// eslint-disable-next-line import/no-cycle
import TodoList, { inputTodo } from './module/updateStatus.js';
import { editDescription, clearComoleted, render } from './module/addRemove.js';

const TodoListObj = new TodoList();

export default function Starter() {
  const threeDots = document.querySelectorAll('li');
  threeDots.forEach((dotValue, index) => {
    const dot = dotValue.querySelector('.dots');
    if (dot) {
      const newDot = dot.cloneNode(true);
      dotValue.replaceChild(newDot, dot);
      newDot.addEventListener('click', () => {
        editDescription(dotValue, index, TodoListObj);
        Starter();
      });
    }
  });
}

inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    TodoListObj.addTodo();
    render(TodoListObj.list, TodoListObj);
    Starter();
  }
});

clearComoleted.addEventListener('click', () => {
  TodoListObj.removeList();
  render(TodoListObj.list, TodoListObj);
  Starter();
});

render(TodoListObj.list, TodoListObj);
Starter();

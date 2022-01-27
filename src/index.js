import './style.css';
// eslint-disable-next-line import/no-cycle
import Starter from './module/starter.js';
import TodoList from './module/updateStatus.js';
import { clearCompleted, render } from './module/addRemove.js';

const TodoListObj = new TodoList();

const inputTodo = document.querySelector('.list');
inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    TodoListObj.addTodo(inputTodo.value.trim());
    inputTodo.value = '';
    render(TodoListObj.list, TodoListObj);
    Starter();
  }
});

clearCompleted.addEventListener('click', () => {
  const strickers = document.querySelectorAll('.strike');
  strickers.forEach((value) => {
    const parentContainerLi = value.parentNode.parentNode;
    parentContainerLi.style.display = 'none';
    const title = parentContainerLi.querySelector('.tagP').textContent;
    TodoListObj.removeList(title);
  });

  render(TodoListObj.list, TodoListObj);
  Starter();
});

render(TodoListObj.list, TodoListObj);
Starter();

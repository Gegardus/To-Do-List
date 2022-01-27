// eslint-disable-next-line import/no-cycle
import TodoList from './updateStatus.js';
// eslint-disable-next-line import/no-cycle
import { editDescription } from './addRemove.js';

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
      });
    }
  });
}

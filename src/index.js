// import _ from 'lodash';
import './style.css';

const todoListContianer = document.querySelector('.list');

const todoList = [
  { description: 'Wake up on time', completed: false, index: 0 },
  { description: 'Complete all the quests of the curriculum', completed: false, index: 1 },
  { description: 'Go to bed early to rest', completed: false, index: 2 },

];

todoList.forEach((list) => {
  todoListContianer.innerHTML += `<li>
  <div class="check">
    <input type="checkbox" name="completed" />
    <p>${list.description}</p>
  </div>
  <div class="dots">
  </div>
</li>
<hr /> `;
});
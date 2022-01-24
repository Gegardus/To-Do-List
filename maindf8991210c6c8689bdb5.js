/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Starter)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _module_updateStatus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/updateStatus.js */ "./src/module/updateStatus.js");
/* harmony import */ var _module_addRemove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/addRemove.js */ "./src/module/addRemove.js");

// eslint-disable-next-line import/no-cycle



const TodoListObj = new _module_updateStatus_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

function Starter() {
  const threeDots = document.querySelectorAll('li');
  threeDots.forEach((dotValue, index) => {
    const dot = dotValue.querySelector('.dots');
    if (dot) {
      const newDot = dot.cloneNode(true);
      dotValue.replaceChild(newDot, dot);
      newDot.addEventListener('click', () => {
        (0,_module_addRemove_js__WEBPACK_IMPORTED_MODULE_2__.editDescription)(dotValue, index, TodoListObj);
        Starter();
      });
    }
  });
}

_module_updateStatus_js__WEBPACK_IMPORTED_MODULE_1__.inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    TodoListObj.addTodo();
    (0,_module_addRemove_js__WEBPACK_IMPORTED_MODULE_2__.render)(TodoListObj.list, TodoListObj);
    Starter();
  }
});

_module_addRemove_js__WEBPACK_IMPORTED_MODULE_2__.clearCompleted.addEventListener('click', () => {
  const strickers = document.querySelectorAll('.strike');
  strickers.forEach((value) => {
    const parentContainerLi = value.parentNode.parentNode;
    parentContainerLi.style.display = 'none';
    const title = parentContainerLi.querySelector('.tagP').textContent;
    TodoListObj.removeList(title);
  });

  (0,_module_addRemove_js__WEBPACK_IMPORTED_MODULE_2__.render)(TodoListObj.list, TodoListObj);
  Starter();
});

(0,_module_addRemove_js__WEBPACK_IMPORTED_MODULE_2__.render)(TodoListObj.list, TodoListObj);
Starter();


/***/ }),

/***/ "./src/module/addRemove.js":
/*!*********************************!*\
  !*** ./src/module/addRemove.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearCompleted": () => (/* binding */ clearCompleted),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "editDescription": () => (/* binding */ editDescription)
/* harmony export */ });
const todoListContianer = document.querySelector('.list');
const listConatiner = document.querySelector('.container');
const singleList = document.createElement('li');
const clearCompleted = document.querySelector('.clearMarked');

function render(member, TodoListObj) {
  todoListContianer.innerHTML = '';
  member.forEach((list) => {
    const check = list.completed ? 'checked' : null;
    singleList.innerHTML = `
    <div class="check">
      <input type="checkbox" name="completed" value="${list.index}" ${check}  class="chBox"/>
      <p class="tagP">${list.description}</p>
    </div>
    <div class="dots">
    </div>`;
    todoListContianer.appendChild(singleList.cloneNode(true));
    if (check === 'checked') {
      const box = todoListContianer.querySelectorAll('.chBox');
      box.forEach((value) => {
        if (value.checked) {
          value.nextElementSibling.classList.add('strike');
        }
      });
    }
    listConatiner.appendChild(todoListContianer);
  });

  // EventListner for CheckBox
  const checkBox = document.querySelectorAll('.chBox');
  let marked = false;
  checkBox.forEach((content, index) => {
    content.addEventListener('change', () => {
      if (content.checked) {
        marked = true;
        TodoListObj.markList(content, index, marked);
      } else {
        marked = false;
        TodoListObj.markList(content, index, marked);
      }
    });
  });
}

function editDescription(dotValue, index, TodoListObj) {
  const imageTrash = todoListContianer.querySelectorAll('li');
  const parentImage = imageTrash[index];

  const divTrash = document.createElement('div');
  divTrash.classList.add('trash');
  const divDot = document.createElement('div');
  divDot.classList.add('dots');

  if (document.querySelector('.color')) {
    document.querySelector('.color').appendChild(divDot);
    document.querySelector('.color .trash').remove();
    document.querySelector('.color').classList.remove('color');
  }

  parentImage.appendChild(divTrash);
  parentImage.classList.add('color');
  imageTrash[index].querySelector('.dots').remove();
  divTrash.addEventListener('click', () => {
    const content = parentImage.querySelector('.tagP');
    content.classList.add('strike');
    TodoListObj.removeList();
  });

  const pDots = divTrash.parentNode.querySelector('.tagP');
  pDots.contentEditable = true;
  pDots.addEventListener('keyup', (e) => {
    TodoListObj.editListWrite(pDots, index, e);
  });
}


/***/ }),

/***/ "./src/module/updateStatus.js":
/*!************************************!*\
  !*** ./src/module/updateStatus.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inputTodo": () => (/* binding */ inputTodo),
/* harmony export */   "default": () => (/* binding */ TodoList)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./src/index.js");
// eslint-disable-next-line import/no-cycle


const inputTodo = document.querySelector('.add');

class TodoList {
  constructor() {
    this.list = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }

  addTodo() {
    const listLength = this.list.length;
    if (inputTodo.value.trim() !== '') {
      this.list.push({
        description: inputTodo.value,
        completed: false,
        index: listLength,
      });
    }

    this.reArrange();
    localStorage.setItem('todoList', JSON.stringify(this.list));
    inputTodo.value = '';
  }

  markList(content, index, marked) {
    const p = content.parentNode.querySelector('.tagP');
    const title = p.textContent;
    if (marked === true) {
      this.list = this.list.filter((item) => {
        if (item.description === title) {
          item.completed = true;
          return item;
        }
        return item;
      });
      p.classList.add('strike');
    } else {
      this.list = this.list.filter((item) => {
        if (item.description === title) {
          item.completed = false;
          return item;
        }
        return item;
      });
      p.classList.remove('strike');
    }

    const hold = this.list.filter((item) => item);
    this.list = hold;
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  removeList() {
    const strickers = document.querySelectorAll('.strike');
    strickers.forEach((value) => {
      const parentContainerLi = value.parentNode.parentNode;
      parentContainerLi.style.display = 'none';
      const title = parentContainerLi.querySelector('.tagP').textContent;
      this.list = this.list.filter((value) => value.description !== title);
    });

    this.reArrange();
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  // Utilities

  editListWrite(pDots, index, e) {
    if (e.key === 'Enter') {
      pDots.contentEditable = false;
      document.querySelector('.color .trash').remove();
      this.divDot = document.createElement('div');
      this.divDot.classList.add('dots');
      document.querySelector('.color').appendChild(this.divDot);
      document.querySelector('.color').classList.remove('color');
      const change = pDots.innerText;
      pDots.innerText = change
        .split('')
        .splice(0, change.length - 2)
        .join('');
    }

    this.list[index].description = pDots.innerText;
    localStorage.setItem('todoList', JSON.stringify(this.list));
    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }

  reArrange() {
    this.list.forEach((value, index) => {
      value.index = index + 1;
    });
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmRmODk5MTIxMGM2Yzg2ODliZGI1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FxQjtBQUNyQjtBQUMrRDtBQUNpQjs7QUFFaEYsd0JBQXdCLCtEQUFROztBQUVqQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBZTtBQUN2QjtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQSwrRUFBMEI7QUFDMUI7QUFDQTtBQUNBLElBQUksNERBQU07QUFDVjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLDREQUFNO0FBQ1I7QUFDQSxDQUFDOztBQUVELDREQUFNO0FBQ047Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNPOztBQUVBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxXQUFXLElBQUksUUFBUTtBQUM5RSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekVBO0FBQ2tDOztBQUUzQjs7QUFFUTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHFEQUFPO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7VUMvRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGUvYWRkUmVtb3ZlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlL3VwZGF0ZVN0YXR1cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1jeWNsZVxuaW1wb3J0IFRvZG9MaXN0LCB7IGlucHV0VG9kbyB9IGZyb20gJy4vbW9kdWxlL3VwZGF0ZVN0YXR1cy5qcyc7XG5pbXBvcnQgeyBlZGl0RGVzY3JpcHRpb24sIGNsZWFyQ29tcGxldGVkLCByZW5kZXIgfSBmcm9tICcuL21vZHVsZS9hZGRSZW1vdmUuanMnO1xuXG5jb25zdCBUb2RvTGlzdE9iaiA9IG5ldyBUb2RvTGlzdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdGFydGVyKCkge1xuICBjb25zdCB0aHJlZURvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICB0aHJlZURvdHMuZm9yRWFjaCgoZG90VmFsdWUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZG90ID0gZG90VmFsdWUucXVlcnlTZWxlY3RvcignLmRvdHMnKTtcbiAgICBpZiAoZG90KSB7XG4gICAgICBjb25zdCBuZXdEb3QgPSBkb3QuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgZG90VmFsdWUucmVwbGFjZUNoaWxkKG5ld0RvdCwgZG90KTtcbiAgICAgIG5ld0RvdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZWRpdERlc2NyaXB0aW9uKGRvdFZhbHVlLCBpbmRleCwgVG9kb0xpc3RPYmopO1xuICAgICAgICBTdGFydGVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5pbnB1dFRvZG8uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBUb2RvTGlzdE9iai5hZGRUb2RvKCk7XG4gICAgcmVuZGVyKFRvZG9MaXN0T2JqLmxpc3QsIFRvZG9MaXN0T2JqKTtcbiAgICBTdGFydGVyKCk7XG4gIH1cbn0pO1xuXG5jbGVhckNvbXBsZXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3Qgc3RyaWNrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0cmlrZScpO1xuICBzdHJpY2tlcnMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICBjb25zdCBwYXJlbnRDb250YWluZXJMaSA9IHZhbHVlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICBwYXJlbnRDb250YWluZXJMaS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGNvbnN0IHRpdGxlID0gcGFyZW50Q29udGFpbmVyTGkucXVlcnlTZWxlY3RvcignLnRhZ1AnKS50ZXh0Q29udGVudDtcbiAgICBUb2RvTGlzdE9iai5yZW1vdmVMaXN0KHRpdGxlKTtcbiAgfSk7XG5cbiAgcmVuZGVyKFRvZG9MaXN0T2JqLmxpc3QsIFRvZG9MaXN0T2JqKTtcbiAgU3RhcnRlcigpO1xufSk7XG5cbnJlbmRlcihUb2RvTGlzdE9iai5saXN0LCBUb2RvTGlzdE9iaik7XG5TdGFydGVyKCk7XG4iLCJjb25zdCB0b2RvTGlzdENvbnRpYW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0Jyk7XG5jb25zdCBsaXN0Q29uYXRpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpO1xuY29uc3Qgc2luZ2xlTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5leHBvcnQgY29uc3QgY2xlYXJDb21wbGV0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXJNYXJrZWQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihtZW1iZXIsIFRvZG9MaXN0T2JqKSB7XG4gIHRvZG9MaXN0Q29udGlhbmVyLmlubmVySFRNTCA9ICcnO1xuICBtZW1iZXIuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrID0gbGlzdC5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiBudWxsO1xuICAgIHNpbmdsZUxpc3QuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJjaGVja1wiPlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjb21wbGV0ZWRcIiB2YWx1ZT1cIiR7bGlzdC5pbmRleH1cIiAke2NoZWNrfSAgY2xhc3M9XCJjaEJveFwiLz5cbiAgICAgIDxwIGNsYXNzPVwidGFnUFwiPiR7bGlzdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRvdHNcIj5cbiAgICA8L2Rpdj5gO1xuICAgIHRvZG9MaXN0Q29udGlhbmVyLmFwcGVuZENoaWxkKHNpbmdsZUxpc3QuY2xvbmVOb2RlKHRydWUpKTtcbiAgICBpZiAoY2hlY2sgPT09ICdjaGVja2VkJykge1xuICAgICAgY29uc3QgYm94ID0gdG9kb0xpc3RDb250aWFuZXIucXVlcnlTZWxlY3RvckFsbCgnLmNoQm94Jyk7XG4gICAgICBib3guZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmNoZWNrZWQpIHtcbiAgICAgICAgICB2YWx1ZS5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnc3RyaWtlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBsaXN0Q29uYXRpbmVyLmFwcGVuZENoaWxkKHRvZG9MaXN0Q29udGlhbmVyKTtcbiAgfSk7XG5cbiAgLy8gRXZlbnRMaXN0bmVyIGZvciBDaGVja0JveFxuICBjb25zdCBjaGVja0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaEJveCcpO1xuICBsZXQgbWFya2VkID0gZmFsc2U7XG4gIGNoZWNrQm94LmZvckVhY2goKGNvbnRlbnQsIGluZGV4KSA9PiB7XG4gICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoY29udGVudC5jaGVja2VkKSB7XG4gICAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgICAgIFRvZG9MaXN0T2JqLm1hcmtMaXN0KGNvbnRlbnQsIGluZGV4LCBtYXJrZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFya2VkID0gZmFsc2U7XG4gICAgICAgIFRvZG9MaXN0T2JqLm1hcmtMaXN0KGNvbnRlbnQsIGluZGV4LCBtYXJrZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXREZXNjcmlwdGlvbihkb3RWYWx1ZSwgaW5kZXgsIFRvZG9MaXN0T2JqKSB7XG4gIGNvbnN0IGltYWdlVHJhc2ggPSB0b2RvTGlzdENvbnRpYW5lci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpO1xuICBjb25zdCBwYXJlbnRJbWFnZSA9IGltYWdlVHJhc2hbaW5kZXhdO1xuXG4gIGNvbnN0IGRpdlRyYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdlRyYXNoLmNsYXNzTGlzdC5hZGQoJ3RyYXNoJyk7XG4gIGNvbnN0IGRpdkRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXZEb3QuY2xhc3NMaXN0LmFkZCgnZG90cycpO1xuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3InKSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvcicpLmFwcGVuZENoaWxkKGRpdkRvdCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yIC50cmFzaCcpLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvcicpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbG9yJyk7XG4gIH1cblxuICBwYXJlbnRJbWFnZS5hcHBlbmRDaGlsZChkaXZUcmFzaCk7XG4gIHBhcmVudEltYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbG9yJyk7XG4gIGltYWdlVHJhc2hbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJy5kb3RzJykucmVtb3ZlKCk7XG4gIGRpdlRyYXNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBwYXJlbnRJbWFnZS5xdWVyeVNlbGVjdG9yKCcudGFnUCcpO1xuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnc3RyaWtlJyk7XG4gICAgVG9kb0xpc3RPYmoucmVtb3ZlTGlzdCgpO1xuICB9KTtcblxuICBjb25zdCBwRG90cyA9IGRpdlRyYXNoLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnRhZ1AnKTtcbiAgcERvdHMuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcbiAgcERvdHMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIFRvZG9MaXN0T2JqLmVkaXRMaXN0V3JpdGUocERvdHMsIGluZGV4LCBlKTtcbiAgfSk7XG59XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWN5Y2xlXG5pbXBvcnQgU3RhcnRlciBmcm9tICcuLi9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5saXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9MaXN0JylcbiAgICAgID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb0xpc3QnKSlcbiAgICAgIDogW107XG4gIH1cblxuICBhZGRUb2RvKCkge1xuICAgIGNvbnN0IGxpc3RMZW5ndGggPSB0aGlzLmxpc3QubGVuZ3RoO1xuICAgIGlmIChpbnB1dFRvZG8udmFsdWUudHJpbSgpICE9PSAnJykge1xuICAgICAgdGhpcy5saXN0LnB1c2goe1xuICAgICAgICBkZXNjcmlwdGlvbjogaW5wdXRUb2RvLnZhbHVlLFxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICBpbmRleDogbGlzdExlbmd0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucmVBcnJhbmdlKCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9MaXN0JywgSlNPTi5zdHJpbmdpZnkodGhpcy5saXN0KSk7XG4gICAgaW5wdXRUb2RvLnZhbHVlID0gJyc7XG4gIH1cblxuICBtYXJrTGlzdChjb250ZW50LCBpbmRleCwgbWFya2VkKSB7XG4gICAgY29uc3QgcCA9IGNvbnRlbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcudGFnUCcpO1xuICAgIGNvbnN0IHRpdGxlID0gcC50ZXh0Q29udGVudDtcbiAgICBpZiAobWFya2VkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmRlc2NyaXB0aW9uID09PSB0aXRsZSkge1xuICAgICAgICAgIGl0ZW0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH0pO1xuICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzdHJpa2UnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ID0gdGhpcy5saXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5kZXNjcmlwdGlvbiA9PT0gdGl0bGUpIHtcbiAgICAgICAgICBpdGVtLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgICBwLmNsYXNzTGlzdC5yZW1vdmUoJ3N0cmlrZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGhvbGQgPSB0aGlzLmxpc3QuZmlsdGVyKChpdGVtKSA9PiBpdGVtKTtcbiAgICB0aGlzLmxpc3QgPSBob2xkO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHRoaXMubGlzdCkpO1xuICB9XG5cbiAgcmVtb3ZlTGlzdCgpIHtcbiAgICBjb25zdCBzdHJpY2tlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RyaWtlJyk7XG4gICAgc3RyaWNrZXJzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnRDb250YWluZXJMaSA9IHZhbHVlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgIHBhcmVudENvbnRhaW5lckxpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBjb25zdCB0aXRsZSA9IHBhcmVudENvbnRhaW5lckxpLnF1ZXJ5U2VsZWN0b3IoJy50YWdQJykudGV4dENvbnRlbnQ7XG4gICAgICB0aGlzLmxpc3QgPSB0aGlzLmxpc3QuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUuZGVzY3JpcHRpb24gIT09IHRpdGxlKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVBcnJhbmdlKCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9MaXN0JywgSlNPTi5zdHJpbmdpZnkodGhpcy5saXN0KSk7XG4gIH1cblxuICAvLyBVdGlsaXRpZXNcblxuICBlZGl0TGlzdFdyaXRlKHBEb3RzLCBpbmRleCwgZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgcERvdHMuY29udGVudEVkaXRhYmxlID0gZmFsc2U7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3IgLnRyYXNoJykucmVtb3ZlKCk7XG4gICAgICB0aGlzLmRpdkRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5kaXZEb3QuY2xhc3NMaXN0LmFkZCgnZG90cycpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yJykuYXBwZW5kQ2hpbGQodGhpcy5kaXZEb3QpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yJykuY2xhc3NMaXN0LnJlbW92ZSgnY29sb3InKTtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IHBEb3RzLmlubmVyVGV4dDtcbiAgICAgIHBEb3RzLmlubmVyVGV4dCA9IGNoYW5nZVxuICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgIC5zcGxpY2UoMCwgY2hhbmdlLmxlbmd0aCAtIDIpXG4gICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RbaW5kZXhdLmRlc2NyaXB0aW9uID0gcERvdHMuaW5uZXJUZXh0O1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHRoaXMubGlzdCkpO1xuICAgIFN0YXJ0ZXIoKTtcbiAgfVxuXG4gIHJlQXJyYW5nZSgpIHtcbiAgICB0aGlzLmxpc3QuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICB2YWx1ZS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
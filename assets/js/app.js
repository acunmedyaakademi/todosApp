const addTodoBtn = document.querySelector('.addTodoBtn'); // todo ekleme butonu
const todoText = document.querySelector('.todoText'); // todo yazma  alanı
const todolist = document.querySelector('.todo-text'); // todo list alanı

const dateInput = document.querySelector('.dateInput')
const today = new Date()
today.setDate(today.getDate() + 1)
const minDate = today.toISOString().split("T")[0]
dateInput.setAttribute('min', minDate);



let todo;

if (localStorage.todo) {
  todo = JSON.parse(localStorage.todo);
} else {
  todo = [];
}

function saveToLocalStorage() {
  localStorage.setItem('todo', JSON.stringify(todo));
}

addTodoBtn.addEventListener('click', addGorev);

function getToDo() {
  todolist.innerHTML = '';
  todo.forEach(function (todoItem, i) {
    todolist.innerHTML += `
            <div class="todo-list">
                <div class="todo-info" id="${todoItem.id}"  >
                    <span class="todo-text-span" ${todoItem.completed ? 'style="color: red;"' : ''}>${todoItem.gorev}</span>
                    <p>${todoItem.date}</p>  
                    <button class="deleteBtn">❌</button>
                    <button class="editBtn">🖊️</button>
                    <button class="cmpBtn" >✅</button>
                </div>
            </div>
        `;
  });
  bindDeleteBtns();
  bindEditBtns();
  bindOkeyBtns();
}


function bindEditBtns() {
  const editBtns = document.querySelectorAll(".editBtn");
  editBtns.forEach(editBtn => {
    editBtn.addEventListener("click", function () {
      const answer = prompt("Ne ile değiştirmek istersiniz?");
      const editId = parseInt(this.parentElement.id);
      const editTodo = todo.find(item => item.id === editId);
      if (editTodo) {
        editTodo.gorev = answer;
        saveToLocalStorage()
        getToDo()
      }
    });
  });
}


function addGorev(e) {
  e.preventDefault()
  const dateInput = document.querySelector('.dateInput')
  const answer = todoText.value;
  const selectDate = new Date(dateInput.value)
  const formatteDate = selectDate.toLocaleDateString();
  todoText.value = "";
  if (answer !== "") {
    todo.push({ id: Number(todo.length + 1), gorev: answer, completed: false, date: formatteDate });
    saveToLocalStorage();
    getToDo();
  }
}


function bindDeleteBtns() {
  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach(function (deleteBtn) {
    deleteBtn.addEventListener('click', function () {
      const parentId = Number(this.parentElement.id);
      todo = todo.filter(deleteTodo => deleteTodo.id !== parentId);
      saveToLocalStorage()
      getToDo();
    });
  });
}

function bindOkeyBtns() {
  const okeyBtns = document.querySelectorAll('.cmpBtn');
  okeyBtns.forEach(function (okeyBtn) {
    okeyBtn.addEventListener('click', function () {
      for (const okeyTodo of todo) {
        if (okeyTodo.id == this.parentElement.id) {
          if (okeyTodo.completed) {
            okeyTodo.completed = false
          }
          else {
            okeyTodo.completed = true
          }
          saveToLocalStorage();
          getToDo()
        }
      }
      console.log(this.id);
      console.log(this.parentElement.id);
    });
  });
}


getToDo();

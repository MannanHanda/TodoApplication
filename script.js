let inputEl = document.getElementById('inputData');
let buttonEl = document.getElementById('button');
let todoContainer = document.getElementById('todoContainer');


// To title case
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}



// Getting the existing items from local storage
function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem('todoList');
  let parseTodoList = JSON.parse(stringifiedTodoList);

  if (parseTodoList === null) {
    return [];
  } else {
    return parseTodoList;
  }
}


let todoList = getTodoListFromLocalStorage();
let count = todoList.length;



// Adding the styles of the todo item dynamically in JavaScript
function addElement(todoItem) {


  count += 1;

  let todoItemId = 'todoItem' + count;
  let deleteId = 'delete' + count;
  let cutId = 'cut' + count;

  let todoItemDivEl = document.createElement("div");
  todoItemDivEl.id = todoItemId;
  todoItemDivEl.classList.add('todo-item');

  let textDivEl = document.createElement("div");
  textDivEl.classList.add('text');
  let textParagraphEl = document.createElement("p");
  textParagraphEl.textContent = todoItem.text;
  textDivEl.appendChild(textParagraphEl);

  if (todoItem.checkboxStatus) {
    textParagraphEl.classList.add('cut');
  } else {
    textParagraphEl.classList.remove('cut');
  }

  let deleteDivEl = document.createElement("div");
  deleteDivEl.classList.add('delete-button');
  let iEl = document.createElement("i");
  iEl.classList.add('far', 'fa-trash-alt', 'delete-icon');
  iEl.id = deleteId;
  deleteDivEl.appendChild(iEl);

  let cutDivEl = document.createElement("div");
  cutDivEl.classList.add('cut-button');
  let cutParagraphEl = document.createElement("p");
  cutParagraphEl.textContent = 'Cut';
  cutDivEl.appendChild(cutParagraphEl);
  cutParagraphEl.id = cutId;

  todoItemDivEl.appendChild(textDivEl);
  todoItemDivEl.appendChild(deleteDivEl);
  todoItemDivEl.appendChild(cutDivEl);

  todoContainer.appendChild(todoItemDivEl);

  iEl.addEventListener('click', function () {
    deleteTodoItem(todoItemDivEl, todoItem);
  });

  cutParagraphEl.addEventListener('click', function () {
    cutTodoItem(todoItem, textParagraphEl);
  });
}



// Saving to local storage
function save() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}



// Cutting a todoItem
function cutTodoItem(todoItem, textParagraphEl) {

  todoItem.checkboxStatus = !todoItem.checkboxStatus;
  textParagraphEl.classList.toggle('cut');
  save();
  
}



// Deleting a todoItem
function deleteTodoItem(todoItemDivEl, todoItem) {
  todoContainer.removeChild(todoItemDivEl);

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].text === todoItem.text) {
      let spliced = todoList.splice(i, 1);
      save();
    }
  }
}



// Adding an event listener to the add button to call the addElement function
buttonEl.addEventListener('click', function () {

  let valueEl = (inputEl.value).trim();
  valueEl = toTitleCase(valueEl);

  for(let item of todoList){
    
    if( (item.text).toLowerCase() === valueEl.toLowerCase() ){
      alert('Sorry, but you cannot have the same entry twice!')
      inputEl.value = '';
      return;
    }

  }

  if (valueEl === '') {
    alert("Please don't leave the fields empty");
    return;
  } 

  
  let currentObj = { text: valueEl, uniqueNo: count, checkboxStatus: false };
  todoList.push(currentObj);

  inputEl.value = '';
  addElement(currentObj);
  save();
  

});






for (let item of todoList) {
  addElement(item);
}

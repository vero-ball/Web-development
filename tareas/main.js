var taskInput = document.getElementById('new-task'); // new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//New Task List item
var createNewTaskElement = function(taskString) {
  // input checkbox
  var checkBox = document.createElement('input');
  checkBox.type = 'checkBox';

  // label
  var label = document.createElement('label');
  label.innerText = taskString;

  // input (text)
  var editInput = document.createElement('input');
  editInput.type = 'text';

  // button.edit
  var editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  // button.delete
  var deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  // create List Item
  var listItem = document.createElement('li');
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//Add a new task
var addTask = function() {
  console.log('Adding Task...');
  //Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

//Edit an existing task
var editTask = function() {
  console.log('Editing Task...');

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var readOnlyLabel = listItem.querySelector('label');

  var containsClass = listItem.classList.contains('editMode');

  // if class of the parent is .editMode
  if (containsClass) {
    //Switching from .editMode
    //label text become the input's value
    readOnlyLabel.innerText = editInput.value;
  } else {
    //Switching to .editMode
    //input value becomes the labels text
    editInput.value = readOnlyLabel.innerText;
  }
  //Toggle .editMode on the parent
  listItem.classList.toggle('editMode');
};

//Delete an existing task
var deleteTask = function() {
  console.log('Deleting Task...');
  //Remove the parent list item from the ul
  var listItem = this.parentNode;
  var list = listItem.parentNode;

  list.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = function() {
  console.log('Task Complete...');
  //When the Checkbox is checked
  //Append the task list item to the #completed-tasks ul
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log('Task Incomplete...');
  //When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Set the click handler to the addTask function
addButton.addEventListener('click', addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('Binding List item events');
  // select listitems chidlren
  //bind checkBoxEventHandler to checkbox
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  checkBox.onchange = checkBoxEventHandler;
  //bind editTask to edit button
  var editButton = taskListItem.querySelector('button.edit');
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  var deleteButton = taskListItem.querySelector('button.delete');
  deleteButton.onclick = deleteTask;
};

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

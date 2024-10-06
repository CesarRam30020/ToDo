const taskList = document.getElementById('task-list');
let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

document.getElementById('add-task-btn').addEventListener('click', function() {
  const taskInput = document.getElementById('task-input');
  
  if (taskInput.value.trim() === "") {
    const message = document.getElementById("message");
    message.innerHTML = "No puedes añadir una tarea vacía.";
    message.classList.toggle('earthquake');
    return;
  }

  addTask(taskInput.value);
  taskInput.value = "";
  document.getElementById("message").innerHTML = "";
});

const addTask = (taskText, finished = false, save = true) => {
  const li = document.createElement('li');
  const completedCheck = document.createElement('p');
  const text = document.createElement('p');
  
  text.textContent = taskText
  
  completedCheck.innerText = "✅";
  completedCheck.classList.add('invisible');
  
  li.appendChild(completedCheck);
  li.appendChild(text);

  if (save) {
    tasksArray.push({ text: taskText, finished: finished });
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.className = 'delete-btn';
  
  deleteBtn.onclick = function() {
    taskList.removeChild(li);
    tasksArray = tasksArray.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    
    listIsEmpty();
  };

  li.appendChild(deleteBtn);

  li.addEventListener('click', function() {
    text.classList.toggle('completed');
    completedCheck.classList.toggle('invisible');
    tasksArray = tasksArray.map(task => 
      task.text === taskText ? { ...task, finished: !task.finished } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  });

  if (finished) {
    li.classList.add('completed');
    completedCheck.classList.remove('invisible');
  }

  taskList.appendChild(li);
  listIsEmpty();
}

const checkStorage = () => {
  if (tasksArray.length > 0) {
    tasksArray.forEach(task => {
      addTask(task.text, task.finished, false);
    });
  }
}

const listIsEmpty = () => {
  if (tasksArray.length == 0) {
    document.getElementById("message").innerHTML = "No hay tareas por realizar";
  }
}

checkStorage();
listIsEmpty();

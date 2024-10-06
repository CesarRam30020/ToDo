const taskList = document.getElementById('task-list');
let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

// Escuchar el botón de añadir tarea
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

// Añadir tarea al DOM y actualizar `tasksArray`
const addTask = (taskText, finished = false, save = true) => {
  const li = document.createElement('li');
  li.textContent = taskText;

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
    li.classList.toggle('completed');
    tasksArray = tasksArray.map(task => 
      task.text === taskText ? { ...task, finished: !task.finished } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  });

  if (finished) li.classList.add('completed');

  taskList.appendChild(li);
  listIsEmpty();
}

// Cargar las tareas almacenadas en el DOM sin duplicarlas
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
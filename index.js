// let tasks = localStorage.getItem('tasks');

// alert(tasks !== null);

// if (tasks !== null) {
//   tasks.forEach(task => {
//     alert(task);
//   });
// } else {
//   localStorage.setItem('tasks', '[]')
// }

document.getElementById('add-task-btn').addEventListener('click', function() {
  const taskInput = document.getElementById('task-input');
  
  if (taskInput.value.trim() !== "") {
    addTask(taskInput.value); // Llama a la función con el valor del input
    taskInput.value = ""; // Limpiar el campo de entrada
  }
});

function addTask(taskText) {
  const taskList = document.getElementById('task-list');
  const li = document.createElement('li');
  li.textContent = taskText; // Usa el argumento recibido en lugar de taskInput.value

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.className = 'delete-btn';
  
  deleteBtn.onclick = function() {
    taskList.removeChild(li);
  };

  li.appendChild(deleteBtn);

  li.addEventListener('click', function() {
    li.classList.toggle('completed');
  });

  taskList.appendChild(li);
}

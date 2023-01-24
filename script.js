'use strict'

const URL =
  'https://api.openweathermap.org/data/2.5/weather?lat=63.09&lon=21.610&units=metric&appid=b102d81092eef4a28e509bfe54a92a4d'
async function makeAPICall() {
  const result = await fetch(URL)
  result.json().then((data) => {
    const temperature = data.main.temp
    document.getElementById(
      'apiweather',
    ).innerHTML = `It's ${temperature} °C in Vaasa`
  })
}

makeAPICall()

function fetchTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || []
  let taskList = document.querySelector('#tasks')
  taskList.innerHTML = ''
  tasks.forEach((task) => {
    taskList.innerHTML += `
    <div class="task" data-id="${task.id}">
    <span id ="taskname">
    ${task.text}</span>
    <button class = "edit">
    <i class="fa fa-edit"></i></button>
    <button class = "delete">
    <i class="fa fa-check"></i></button>
    <span id ="newDate">${new Date(task.id).toLocaleDateString()}</span>
    </div>`
  })

  const taskElements = document.querySelectorAll('.task')
  taskElements.forEach((taskEl) => {
    const deleteBtn = taskEl.querySelector('.delete')
    deleteBtn.addEventListener('click', (e) => {
      const taskId = taskEl.getAttribute('data-id')
      deleteTask(taskId)
      taskEl.remove()
      localStorage.setItem('tasks', JSON.stringify(tasks))
    })
  })
}

// Load
let tasks = JSON.parse(localStorage.getItem('tasks')) || []
fetchTasks()
// Add
const addTask = (task) => {
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Delete
const deleteTask = (taskId) => {
  tasks = tasks.filter((t) => t.id != taskId)
}

const updateStorage = () => {
  const stringified = JSON.stringify(tasks)
  localStorage.setItem('tasks', stringified)
  console.log('storage updated')
}

let myinput = document.getElementById('myinput')
let mybtn = document.getElementById('push')
myinput.addEventListener('keyup', (e) => {
  e.preventDefault()
  if (e.keyCode === 13) {
    mybtn.click()
  }
})

document.querySelector('#push').onclick = function () {
  if (document.querySelector('#newtask input').value.length == 0) {
    alert('Please enter a task')
  } else {
    const newTask = {
      id: Date.now(),
      text: document.querySelector('#newtask input').value,
    }

    addTask(newTask)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    document.querySelector('#tasks').innerHTML += `
   
    <div class="task">
    <span id ="taskname">
    ${document.querySelector('#newtask input').value}</span>
    <button class = "edit">
<i class="fa fa-edit"></i></button>
<button class = "delete">
<i class="fa fa-check"></i></button>
<span id ="addDate">${new Date(newTask.id).toLocaleDateString()}</span>
</div>`

    document.querySelector('#myinput').value = ''

    const current_tasks = document.querySelectorAll('.delete')
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        const taskElement = this.closest('.task')
        const taskId = taskElement.getAttribute('data-id')
        deleteTask(taskId)
        taskElement.remove()
        localStorage.setItem('tasks', JSON.stringify(tasks))
      }
    }
  }
}

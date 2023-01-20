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

// Load
let tasks = [];
localStorage.getItem('tasks')

if (!tasks.length) {
  console.error("No tasks loaded")
}

// Add
const addTask = (task) => {
  tasks.push(task)
  updateStorage()
}

// Delete
const deleteTask = (task) => {
  // filter out the task we want to delete
  tasks = tasks.filter(t => t.id != task.id)
  updateStorage()
}

const updateStorage = () => {
  const stringified = JSON.stringify(tasks)
  localStorage.setItem('tasks', stringified)
  console.log("storage updated")
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

    const newTask = {id: Date.now(), text: document.querySelector('#newtask input').value}
    addTask(newTask)

    document.querySelector('#tasks').innerHTML += `
   
    <div class="task">
    <span id ="taskname">
    ${document.querySelector('#newtask input').value}</span>
<button class = "delete">
<i class="fa fa-check"></i></button>
</div>`

    document.querySelector('#myinput').value = ''

    const current_tasks = document.querySelectorAll('.delete')
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        deleteTask(newTask)
        this.parentNode.remove()
      }
    }
  }
}
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc
  }, {});
  // console.log(objOfTasks)


  // Elements UI 
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group',
  )

  const form = document.forms['addTask']
  const inputTitle = form.elements['title']
  const inputBody = form.elements['body']
  
  console.log(inputTitle, inputBody);
  
  // Events
  form.addEventListener('submit', onFormSubmitHandler )
  renderAllTasks(objOfTasks)
  listContainer.addEventListener('click',oneDeleteHendler)

  
  function renderAllTasks(taskList) {
    if (!taskList) {
      console.error("Передайте список");
      return
    }
    // Создадим фрагмент 
    const fragment = document.createDocumentFragment()
    // Принмает объект => возвращает массив
    Object.values(taskList).forEach(task => {
      const li = listItemTemplate(task)
      fragment.appendChild(li)
    })
    listContainer.appendChild(fragment)
  }

  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement("li")
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2'
    )
    li.setAttribute('data-task-id', _id);
    // console.log(li);
    const span = document.createElement("span")
    span.textContent = title
    span.style.fontWeight = 'bold'

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete task"
    deleteBtn.classList.add(
      'btn',
      'btn-danger',
      'ml-auto',
      'delete-btn'
    )
    const article = document.createElement("p")
    article.textContent = body
    article.classList.add(
      'mt-2',
      'w-100'
    )

    li.appendChild(span)
    li.appendChild(deleteBtn)
    li.appendChild(article)
    
    return li
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if(!titleValue || !bodyValue) {
      alert('Empty feilds provided')
      return
    }
    
    const task = crateNewTask(titleValue, bodyValue)
    const listItem =  listItemTemplate(task)
    listContainer.insertAdjacentElement('afterbegin',
    listItem
    )
    form.reset();

  }    
  function crateNewTask(title, body) {
      const newTask ={
        title,
        body,
        completed: false,
        _id: `task-${Math.random()} `
      }
      // console.log(newTask);
      objOfTasks[newTask._id] = newTask;

      return{ ...newTask}
  }

  function deleteTask(id) {
    const {title} =  objOfTasks[id]
    const isConfirm = confirm(`Are you sure that you want to delete ${title}  ? `)
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id]
    return isConfirm;
  }

  function deleteTaskFromHTML(confirmed, el) {
    if (!confirmed) return
    el.remove()
  }

  function oneDeleteHendler(e) {
      if (e.target.classList.contains('delete-btn')) {
        const perent = e.target.closest('[data-task-id]') 
        const id = perent.dataset.taskId
        const confirmed = deleteTask(id)
        deleteTaskFromHTML(confirmed, perent)

        
        
        
        
        
        
        
        // const isConfirm = confirm('Are you sure that you want to delete  ? ')
        // if (isConfirm) {
        // }

      }
  }




})(tasks);

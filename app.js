// Объект
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.'
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.'
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.'
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.'
  }
];
// Основная функция
(function(arrOfTasks) {
  // Обработка массива исходного, создание нового где ключ равен id, а значение сам task()
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elements  UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  // console.log(inputTitle, inputBody);

  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);

  // Работа с объектом и создание фрагмента, и добавлением фрагмента на страницу
  function renderAllTasks(tasksList) {
    // Проверка на передачу списка дел из массива
    if (!tasksList) {
      console.error('Get list');
      return;
    }
    // Создаем фрагмент, в которое будем класть свойства объекта(task, состоящий из DOM-элементов)
    // Сделано для того, чтобы каждый раз Страница не перечертивама DOM-разметку, а сразу создавала task
    const fragment = document.createDocumentFragment();
    // Каждый раз добавляем li в фрагмент
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  //Создание DOM-разметки task
  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2'
    );
    const span = document.createElement('span'); // Title task'а
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button'); // Кнопка Delete
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    deleteBtn.textContent = 'Delete';

    const article = document.createElement('p'); // Описание task'a
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    // Добавляем все элементы в Родительский элемент li
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    // console.log(li);

    return li;
  }

  // Работа с формой для создание нового task
  function onFormSubmitHandler(e) {
    e.preventDefault();

    // Определяем значение input
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    // console.log(titleValue, bodyValue);

    // Проверяем на наличие пустых строк
    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      // в случае пустой строки останавливаем скрипт
      return;
    }

    // Создаем новый task
    const task = createNewTask(titleValue, bodyValue);
    // Подключаем разметку для task
    const listItem = listItemTemplate(task);
    // Определяем расположение нового блока на странице (сверху)
    listContainer.insertAdjacentElement('afterbegin', listItem);
    // Очищаем формы после нажатия на кнопку
    form.reset();
  }

  // Создание нового task
  function createNewTask(title, body) {
    // Прописываем свойство ObjOfTasks и задаем свойства newTask
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}` // Создаем рандомный id вида : task-....
    };

    // console.log(newTask);

    objOfTasks[newTask._id] = newTask; // Создание нового свойство с ключом = id, а значением = newTask

    // console.log(objOfTasks);
    return { ...newTask }; // Возвращаем newTask путем Деструктуризации
  }
})(tasks);

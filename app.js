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

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)'
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)'
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)'
    }
  };

  let lastSelectedTheme = localStorage.getItem('theme') || 'default';

  // Elements  UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');

  // console.log(inputTitle, inputBody);

  setTheme(lastSelectedTheme);

  // Events
  renderAllTasks(objOfTasks);

  form.addEventListener('submit', onFormSubmitHandler);
  //Повесили обработчик событий на все кнопки Delete на click
  listContainer.addEventListener('click', onDeletehandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);

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
    li.setAttribute('data-task-id', _id);
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
  // Подтверждение действий и возврат true/false
  function deleteTask(id) {
    const isConfirm = confirm('Вы уверены, что хотите удалить?');

    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  // Удаление из HTML элемента
  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    //удаления из html
    el.remove();
  }
  // Поиск нужного элемента и его родителя
  function onDeletehandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      const deleteParent = deleteTaskFromHtml(confirmed, parent);
    }
  }

  // Обработчик change на изменеие темы
  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
      `Вы действительно хотите изменить тему на ${selectedTheme} `
    );
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme; // работа с полем изменения темы, если нажали отменить, то поле не изменяет value
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    saveThemeOnLocalStorage(selectedTheme);
  }

  function setTheme(name) {
    const selectedThemObj = themes[name]; // вытаскием имя темы (light, ....)
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value); // меняем значение css переменным
    });
  }

  function saveThemeOnLocalStorage(name) {
    localStorage.setItem('theme', name);
  }
})(tasks);

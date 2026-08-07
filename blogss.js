document.addEventListener('DOMContentLoaded',() => {
    const taskInput = document.querySelector('#task-input');
    const submitBtn = document.querySelector('#submit');
    const fullList = document.querySelector('#todo-list');
    const emptyMessage = document.querySelector('#empty-message');
    const searchBtn = document.querySelector('#search'); 
    const addForm = document.querySelector('#add-form');
          
    let todos = JSON.parse(localStorage.getItem('todoListItems')) || [];

submitBtn.disabled = true;
    
    taskInput.addEventListener('input', () => {
        if(taskInput.value.trim().length != 0)
            submitBtn.disabled = false;
        else
            submitBtn.disabled = true;
    });

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const listitem = taskInput.value.trim();
        if (!listitem) return;
        
        todos.push({ id: Date.now(), text: listitem});
        localStorage.setItem('todoListItems', JSON.stringify(todos));
        taskInput.value = '';
        submitBtn.disabled = true;
        showList();
    });

    searchBtn.addEventListener('input', showList);

    function showList() {
        const search = searchBtn.value.toLowerCase();
        fullList.innerHTML = '';

        todos
            .filter(todo => todo.text.toLowerCase().includes(search))
            .forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.text;

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';

                editBtn.onclick = function() {
                  const newText = prompt('Edit task:', todo.text);

                  if (newText !== null && newText.trim() !== '') {
                    todo.text = newText.trim();

                    localStorage.setItem('todoListItems', JSON.stringify(todos));
            
                    showList();
                  }
                };


                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => {
                    todos = todos.filter(item => item.id !== todo.id);
                    localStorage.setItem('todoListItems', JSON.stringify(todos));
                    showList();
                };

            
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                fullList.appendChild(li);
            });
    }
        
    showList(); 
});


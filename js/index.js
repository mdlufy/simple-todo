const todosNode = document.querySelector('.js-todos');
const inputNode = document.querySelector('.js-input');
const btnDeleteNode = document.querySelector('.js-delete-btn');

let todos = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];

function addTodo(text) {
    const todo = {
        text,
        done: false,
        id: `${Math.random()}`,
    };

    todos.push(todo);
    
    localStorage.setItem('todoList', JSON.stringify(todos));
}

function deleteTodo(id) {
    todos.forEach(todo => {
        if (todo.id === id) {
            todo.done = true;
        }
    })

    localStorage.setItem('todoList', JSON.stringify(todos));
}

function deleteAllTodo() {
    todos.length = 0;

    localStorage.setItem('todoList', JSON.stringify(todos));
}

function render() {
    console.log(todos);

    let html = '';
    

    todos.forEach(todo => {
        if (todo.done) {
            html += `
            <div>
                <strike>${todo.text}</strike>
                <br><br>
            </div>
            `
        }
        else {
            html += `
            <div>
                <button data-id='${todo.id}'>Сделано</button>
                ${todo.text}
                <br><br>
            </div>
            `;
        }
    })

    todosNode.innerHTML = html;
}

inputNode.addEventListener('keypress', (keyPressed) => {
    if (keyPressed.which === 13 && inputNode.value !== '') {
        const text = inputNode.value;
        inputNode.value = '';

        addTodo(text);

        render();
    }
})

todosNode.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    const id = event.target.dataset.id;

    deleteTodo(id);

    render();
});

btnDeleteNode.addEventListener('click', () => {
    deleteAllTodo();

    render();
});

render();
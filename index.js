const todosNode = document.querySelector('.js-todos');
const inputNode = document.querySelector('.js-input');
const btnDeleteNode = document.querySelector('.js-delete-btn');

let todos = [];

function addTodo(text) {
    const todo = {
        text,
        done: false,
        id: `${Math.random()}`
    };

    todos.push(todo);
}

function deleteTodo(id) {
    todos.forEach(todo => {
        if (todo.id === id) {
            todo.done = true;
        }
    })
}

function deleteAllTodo() {
    todos.length = 0;
}

function render() {
    console.log(todos);

    let html = '';

    todos.forEach(todo => {
        if (todo.done) {
            return;
        };

        html += `
      <div>
        <button data-id='${todo.id}'>Сделано</button>
        ${todo.text}
        <br><br>
      </div>

    `;
    })

    todosNode.innerHTML = html;
}

inputNode.addEventListener('keypress', (keyPressed) => {
    if (keyPressed.which === 13) {
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
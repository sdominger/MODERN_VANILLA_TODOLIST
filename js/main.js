import '../styles.scss'
import TodoList from './components/todoList/TodoList.js';

// Instancier une nouvelle todolist
// en lui envoyant l'élément DOM sur lequel se greffer
// et l'URL de l'API à utiliser: https://6347f663db76843976b6e385.mockapi.io/

const todoList = new TodoList ({
    apiURL: "https://6347f663db76843976b6e385.mockapi.io",
    domELT: "#app"
});


window.handleClick = function(todoId) {
/*    const todo = todoList.todos.find(t => t.id == todoId);
    if (todo) {
        todo.check();
    }
*/
todoList.check(todoId);
}

window.delete = function(todoId) {
    todoList.delete(todoId);
    console.log('delete');
}
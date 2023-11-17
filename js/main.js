/* import '../styles.scss' */
import TodoList from './components/todoList/TodoList.js';

// TodoList globale, utilisee dans les onclick dans le html.
const todoList = new TodoList ({
    //apiURL: "https://6347f663db76843976b6e385.mockapi.io",
    apiURL: "https://6525ef4467cfb1e59ce7c235.mockapi.io",
    domELT: "#app"
});

// Onclick de la checkbox
window.checkTask = function(todoId) {
    todoList.check(todoId);
}

// Bouton de filtre all
window.filterAll = function() {
    todoList.setActiveFilter("filter-all"); 
    //todoList.filterTasks(true, true, true);
}

// Bouton de filtre active
window.filterActive = function() {
    todoList.setActiveFilter("filter-active"); 
    //todoList.filterTasks(false, false, true);
}

// Bouton de filtre completed
window.filterCompleted = function() {
    todoList.setActiveFilter("filter-completed"); 
    //todoList.filterTasks(false, true, false);
}
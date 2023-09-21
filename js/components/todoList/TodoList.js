// Création de la classe TodoList
// Avec comme propriétés:
// - elt, todos qui doit contenir des objets de type Todo

import DB from "../../DB";
import Todo from "../todo/Todo";

export default class  {
    constructor(data){
        DB.setApiURL(data.apiURL);
        this.elt = document.querySelector(data.domELT);
        this.todos = [];
        this.loadTodos(); 
    }
    
    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = todos.map(todo => new Todo(todo));
        this.render();
    }

    render () {
        console.table(this.todos);
    }
}
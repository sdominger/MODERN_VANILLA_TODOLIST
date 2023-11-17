// Création de la classe TodoList
// Avec comme propriétés:
// - elt, todos qui doit contenir des objets de type Todo
import DB from "../../DB";
import TodoItem from "../todo/Todo";
import getTodoTemplate from "../todo/template";

/**
 * Todolist.js
 */ 

export default class {
    constructor(data){
        DB.setApiURL(data.apiURL);
        this.filter = "filter-all"; // Filtre en cours.
        this.elt = document.querySelector(data.domELT);
        this.todos = [];
        this.newTodoInput = null;
        this.loadTodos(); 
        this.bindListeners();
        this.updateFooter();

        if(this.elt === null || this.elt === undefined || !this.elt) {
            console.error("HTML element is null for TodoList.");
        }
    }
    
    // Charge les todo par l'API et les ajoute a la todolist.
    async loadTodos() {
        const tasks = await DB.findAll();
        // var tasks = DB.getDefaultTasks();
        
        for(var idx in tasks) {
            this.add(new TodoItem(tasks[idx]), false);
        }
    }

    // Attache les observateurs d'evenements (EventListener) (cleanCompleted; selectAll et filtres)
    bindListeners() {
        // touche entree du new todo.
        {
            let input = this.elt.querySelector(".new-todo");

            if(!input) {
                console.warn("null new-todo element.");
                return;
            }
            this.newTodoInput = this.elt.querySelector('.new-todo');
            input.addEventListener('keyup',  (e) => {
                if (e.key === 'Enter' && this.newTodoInput.value !== ''){
                    this.addNew();
                } 
            });
        }
        // bouton cleanCompleted
        {
            let btn = this.elt.querySelector('#btn-clear-completed');

            if(!btn) {
                console.warn("null btn-clear-completed element.");
                return;
            }
            
            btn.tl = this;
            btn.addEventListener("click", function onclick(event) {
                this.tl.removeCompleted();
                event.preventDefault();
            });
        }
        // bouton selectAll
        {
            let toggle = this.elt.querySelector('#toggle-all');

            if(!toggle) {
                console.warn("null toggle-all element.");
                return;
            }
            
            toggle.tl = this;
            toggle.addEventListener("click", function onclick(event) {
                if(this.checked) {
                    this.tl.selectAll(true);

                } else {
                    this.tl.selectAll(false);
                }
            });
        }
        let ul = document.getElementById("ul");
            // Double click
            /* console.log("adding el for " + newTodo.id);*/ 
            ul.tasks = this.todos;
            ul.addEventListener('dblclick', function(e) {
                console.error("e = " + e.target.tagName);
                if (e.target.tagName === 'LABEL') {
                //$('#children').click(function(e) {e.stopPropagation()})
                    
                const li = e.target.closest('li');
                const id = li.dataset.id;
                console.warn("dblclick " + id);
                const label = li.querySelector('label');
                if (!label) {
                    console.error("label caca");
                }
            
                const input = document.createElement('input');
                input.classList.add('edit');
                input.value = label.textContent;
                console.log("value =" + input.value);
                input.tasks = this.tasks;

            
                
                input.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') {
                        e.preventDefault();
                        console.warn("Enter " + id);
                        const newContent = event.srcElement.value;
                        if (newContent !== '') {
                            label.textContent = newContent;
                            li.classList.remove('editing');
                
                            const id = li.dataset.id;
                            const task = this.tasks.find(task => task.id == id);
                            task.content = newContent;
                            console.warn("Update " + id);
                            DB.update(newTodo); // Update API
                        }
                    event.srcElement.remove();
                    }

                });
            
                li.classList.add('editing');
                li.appendChild(input);
                input.focus();
                }
            });
    }
    
    // Met a jour le compteur de taches
    updateFooter() {
        let tc = this.elt.querySelector('.todo-count');
        if(!tc) {
            console.warn("null todo-count element.");
            return;
        }

        let count = this.todos.filter((todo) => !todo.completed).length;
        tc.innerText = (count == 0) ? "0 items left" : (count == 1) ? "1 item left" : count + " items left";
        this.updateFilter();
    }

    // Retourne le TodoItem correspondant dans la liste des todos.
    getTodo (id) {
        return this.todos.filter(todo => todo.id == id)[0];
    }

    // Supprime une tache a partir de son identifiant, ainsi que la <li> correspondante.
    deleteTask(id) {
        let todo = this.getTodo(id);
        if(todo.li) 
            todo.li.remove();

        this.todos = this.todos.filter((t) => t.id != id); // remove todo from list

        this.updateFooter();
        this.updateFilter();
    }

    // Cree un TodoItem a partir de l'input new-todo et le retourne.
    addNew() {
        // Create TodoItem and add it to the list. 
        let newID = new Date().valueOf();
        
        let txt = this.elt.querySelector('.todo-list').innerHTML;
        if(txt == "") {
            txt = "Test";
        }

        const newTodo = new TodoItem({
            id: newID, 
            li: undefined,
            created_at: new Date(),
            content: this.newTodoInput.value,
            completed: false
        });

        this.add(newTodo);

        this.newTodoInput.value = '';
    }

    // Ajoute un TodoItem a la liste des taches et ajoute le html correspondant, en connectant les listeners.
    add (newTodo, doUpload = true) {
        this.todos.unshift(newTodo);

        // Remplacement du contenu de <ul></ul>.
        let ul = document.getElementById("ul");
        
        ul.insertAdjacentHTML('afterbegin', getTodoTemplate(newTodo));
        let newLi = ul.querySelector(`li[data-id="${newTodo.id}"]`);
        if(!newLi) console.error("newLi invalid");
        newTodo.rebind(newLi);

        // Delete bouton
        let deleteBtn = newLi.querySelector(`button[data-id="${newTodo.id}"]`);
        deleteBtn.tl = this;
        deleteBtn.id = newTodo.id;
        if(!deleteBtn) {
            console.error("null button");
        }
        deleteBtn.html = newTodo.id;
        deleteBtn.addEventListener("click", function onclick(event) {
            this.tl.deleteTask(this.id);
            event.preventDefault();
        });


        if (doUpload) {
            DB.addOne(newTodo); // Update API
        }


        this.updateFooter();
        this.updateFilter();
    }

    // Check le todo avec l'identifiant 'id', mettant a jour le compteur de taches.
    check (id) {
        this.getTodo(id).check();
        this.updateFooter();
    }

    // Modifie les différents liens de filtres en fonction de celui actif.
    setActiveFilter(active) {
        this.filter = active;
        console.log('active' + active );
        
        let filtersIds = ["filter-all", "filter-active", "filter-completed"];
        filtersIds.forEach((element, index) => {
            let a = document.getElementById(element);
            if(element == this.filter)
                a.classList.add("selected");
            else
                a.classList.remove("selected");
        });
        this.updateFilter();
    }

    updateFilter() {
        console.log("updateFilter"+ this.filter);
        if(this.filter == "filter-all") {
            this.filterTasks(true, true, true);
        } else if(this.filter == "filter-active") {
            this.filterTasks(false, false, true);
        } else {
            this.filterTasks(false, true, false);
        }
    }

    // Filtre les taches affichee en fonction du filtre actif, en utilisant l'attribut style.display des li pour les cacher ou non.
    filterTasks(all, active, completed) {
        console.log("all " + all + " active " + active + " completed " + completed);
        for(var idx in this.todos) {
            var t = this.todos[idx]
            if(!t) {
                console.warn(`Cannot find task ${id}`);
            }

            let show = all || (completed && !t.completed) || (active && t.completed);
            console.log(`filtering ${idx}: show = ${show}`);
            if(show) {
                t.li.style.display = "";
            
            } else {
                t.li.style.display = "none";
            }
        }
    }

    // Supprime toutes les tache marquee comme completees.
    removeCompleted() {
        // On rempli une liste des todo a detruire.
        let to_remove = [];
        this.todos.forEach(element => {
            if(element.completed) {
                to_remove.push(element.id);
            }
        });
    
        // Supression des todos.
        for(var idx in to_remove) {
            this.deleteTask(to_remove[idx]);
        }

        this.updateFilter();
        this.updateFooter();
    }

    // Selectionne ou deselectionne tous les  toutes les taches comme completee.
    selectAll(check) {
        this.todos.forEach(element => {
            element.checkFix(check); // Fixe la valeur suivant le booleen check.
        });
        this.updateFooter();
        this.updateFilter();
    }
}
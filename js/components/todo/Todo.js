/**
 * Todo.js
 */ 
import DB from "../../DB";

// Correspond a une tache todo
export default class {
    constructor(data){
        this.id = String(data.id); // identifiant unique
        this.content = data.content; // Contenu
        this.completed = data.completed; // Booleen determinant si la tache est terminee.
        this.createdAt = data.createdAt; // Date de creation.
        this.li = data.li; // Element <li> de la tache
    }

    // Complete ou rend active la tache et ajoute le champ 'completed' (pour le CSS)
    check() {
        this.completed = !this.completed;
        //let html = document.querySelector(`li[data-id="${this.id}"]`);
        let html = this.li;
        html.className = (this.completed) ? 'completed' : '';
        DB.update(this, this.id);
    }

    // Met la checkbox comme check ou non suivant b et met à jour les vues.
    checkFix(completed) {
        this.completed = completed;
        
        let html = this.li;
        html.className = (this.completed) ? 'completed' : '';
        html.querySelector(`input`).checked = completed;
        DB.update(this, this.id);
    }

    // Assigne l'element <li> associe a cette tache.
    rebind(li) {
        this.li = li;
    }

}
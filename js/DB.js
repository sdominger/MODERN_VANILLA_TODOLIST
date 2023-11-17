/* 
export default class {
    static setApiURL (data) {
        this.apiURL = data;
    }

    static async findAll() {
        const reponse = await fetch (this.apiURL + "/tasks");
        return await reponse.json();
    }

    static async addOne (data) {
        const reponse = await fetch(this.apiURL + "/tasks", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        return await reponse.json();
    }
}
*/

/**
 * DB.js
 */ 

// La classe DB contient des methodes statiques permettant la manipulation de l'API.
export default class {
    static setApiURL (data) {
        this.apiURL = data;
    }

    static async findAll() {
        const reponse = await fetch (this.apiURL + "/todos");
        return await reponse.json();
    }

    static async addOne (data) {
        const reponse = await fetch(this.apiURL + "/todos", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        return await reponse.json();
    }

    // Supprimer de l'API
    static async delete (id) {
        const reponse = await fetch(this.apiURL + "/todos/" + id, {
            method: 'Delete',
            headers: {"Content-Type": "application/json"},
        });
        return await reponse.json();
    }

    // Mettre à jour dans l'API
    static async update (data, id) {
        const reponse = await fetch(this.apiURL + "/todos/" + id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        return await reponse.json();
    }

    // Genere des tache (sans l'API) a des fins de test 
    /*
static getDefaultTasks() {
    return [{
        id: "12938",  
        li: undefined,
        created_at: new Date(),
        content: "Cooking",
        completed: false
    },
    {
        id: "4975209",  
        li: undefined,
        created_at: new Date(),
        content: "Write unit tests.",
        completed: false
    },
    {
        id: "12935",  
        li: undefined,
        created_at: new Date(),
        content: "Stuff mon mage.",
        completed: true
    },
    {
        id: "666",  
        li: undefined,
        created_at: new Date(),
        content: "Sleep :(",
        completed: false
    }];
} */
}


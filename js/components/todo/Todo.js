import getTemplate from './template';

export default class {
    constructor(data){
        this.id = data.id;
        this.content = data.content;
        this.completed = data.completed;
        this.createdAt = data.createdAt;
        this.li = data.li;
    }
    render () {
        return getTemplate(this);
    }

    check() {
        console.log(this.li);
        console.error('HeishinEstUneMerde');
        this.completed = !this.completed;
        /* this.li.className = (this.completed) ? 'completed' : ''; */
        let html = document.querySelector(`li[data-id="${this.id}"]`);
        html.className = (this.completed) ? 'completed' : '';
    }

}
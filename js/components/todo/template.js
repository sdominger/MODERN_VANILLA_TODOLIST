import './styles.scss'

export default function (todo) 
// Retourne le code HTML du <li> correspondant au TodoItem 'todo'.
{
    return `
        <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
            <div class="view">
                <input class="toggle" name="no" type="checkbox" ${todo.completed ? 'checked' : ''} onclick="checkTask(${todo.id})" />
                <label>${todo.content}</label>
                <button class="destroy" data-id=${todo.id}></button>
            </div>
        </li>
    `;
}
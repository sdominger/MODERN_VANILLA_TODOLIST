import './styles.scss'

export default function (todo) 
{
    return `
        <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} onclick="handleClick(${todo.id})" />
                <label>${todo.content}</label>
                <button class="destroy" onclick="delete(${todo.id})"></button>
            </div>
        </li>
    `;
}
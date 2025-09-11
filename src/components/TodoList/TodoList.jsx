import styles from './TodoList.module.css';

import { TodoListItem } from '../TodoListItem/TodoListItem.jsx';

export function TodoList({ todos,onUpdate,onDelete }) {
    return (
        <section>
            <h3>Todo-List</h3>
            {!todos.length && (
                <p>Sorry,No todos available. Please add some.</p>
            )}
            <ul className={styles.TodoList}>
                {todos.map((todo) => (
                    <TodoListItem 
                        key={todo.id} 
                        todo={todo} 
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                    
                        
                ))}
            </ul>
        
        </section>
    );
}
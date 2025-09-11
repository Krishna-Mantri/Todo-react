import {PRIORITIES,PRIORITY_DEFAULT} from '../../constants/priorities.js';
import styles from './TodoListItem.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {TodoFormFields} from '../TodoFormFields/TodoFormFields.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { getTodoSchema } from '../../schemas/todo.js';

export function TodoListItem({ todo, onUpdate,onDelete }) {

    const[isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(getTodoSchema()),defaultValues: todo});


    function handleCheckboxChange(event) {
        const updatedTodo = {
            ...todo,
            completed: event.target.checked
        };
        onUpdate(todo.id,updatedTodo);
    }

    function handleEdit(data){
        onUpdate(todo.id,data);
        setIsEditing(false);
    }

    const ViewingTemplate=(
        <div className={styles.Content}>
            <input
                type="checkbox"
                checked={todo.completed}
                name="completed"  
                onChange={handleCheckboxChange}
                className={styles.Status}
            />
            <div className={styles.Info}>
                {todo.name}

                {todo.description &&(
                <span className={styles.Description}>{todo.description}</span>)}

                <div className={styles.AdditionalInfo}>
                    <span>Deadline: {todo.deadline || "No deadline set"}</span>
                    {todo.priority && todo.priority !== PRIORITY_DEFAULT && (
                        <span>
                            Priority:
                            <span style={{color:PRIORITIES[todo.priority].color}}> {PRIORITIES[todo.priority].label}</span>
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.Edit}>
                <button 
                // className={styles.EditButton} 
                onClick={() => setIsEditing(true)}>📑 </button>
                <button onClick={()=>onDelete(todo.id)}>🗑️</button>
            </div>
        </div>
    );


    const EditingTemplate = 
    <form className={styles.Content}  onReset={() => setIsEditing(false)} onSubmit={handleSubmit(handleEdit)}>
        <TodoFormFields todo={todo} register={register} errors={errors}/>

        <div className={styles.Edit}>
            <input type="submit" value="💾"></input>
            <input type="reset" value="❌" onClick={() => setIsEditing(false)}></input>
        </div>
    </form>


    return (
            <li 
                className={styles.TodoListItem} 
                data-completed={todo.completed? "true" : "false"}
            >
                { isEditing ? EditingTemplate : ViewingTemplate }
            </li>
    );
}
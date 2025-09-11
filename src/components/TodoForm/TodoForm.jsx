import styles from './TodoForm.module.css';
import { useState } from 'react';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields.jsx';
import { useForm } from 'react-hook-form';
import { PRIORITY_DEFAULT } from '../../constants/priorities.js';
import { getTodoSchema } from '../../schemas/todo.js';
import { yupResolver } from '@hookform/resolvers/yup';


export function TodoForm({ onCreate }) {
    const [ShowFields, setShowFields] = useState(false);
    const { register, handleSubmit, reset, formState:{errors}, } = useForm({
    resolver: yupResolver(getTodoSchema()),
    defaultValues: {
        description: "",
        deadline: "",
        priority: PRIORITY_DEFAULT,
        completed: false,
    },
    });

    function handleCreate(data) {
        onCreate(data);
        reset();
    }

    return (
        <section>
            <h3 className={styles.Title}>New To-Do
                <button onClick={()=>setShowFields(!ShowFields)}>
                    {ShowFields?"Hide":"Show"} Fields
                </button>
            </h3>

            <form className={styles.Form} onSubmit={handleSubmit(handleCreate)}>
                <TodoFormFields ShowallFields={ShowFields} register={register} errors={errors}/>
                <input type="submit" value="Add To-Do" />
            </form>
        </section>
    );
}
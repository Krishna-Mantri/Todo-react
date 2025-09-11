import {PRIORITIES,PRIORITY_DEFAULT} from '../../constants/priorities.js';
import styles from './TodoFormFields.module.css';



export function TodoFormFields({todo={},ShowallFields=true,register, errors={}}) {
    return(
        <div className={styles.FormFields}>
                    <div className={styles.FormField}>
                        <input 
                            type="text"
                            aria-label="Name*"
                            placeholder="Name*"
                            autoComplete="off" 
                            aria-invalid={!!errors.name} 
                            defaultValue={todo.name}
                            {...register('name')}
                        />
                        {!!errors.name && (
                            <span className={styles.FormFieldError}>{errors.name.message}</span>)}
                    </div>
                    {ShowallFields && (
                        <>
                            <div className={styles.FormField}>
                                <textarea
                                    aria-label="Description"
                                    placeholder="Description"
                                    autoComplete="off"
                                    rows="3"
                                    aria-invalid={!!errors.description} 
                                    defaultValue={todo.description || ''}
                                    {...register('description')}
                                />
                                {!!errors.description && (<span className={styles.FormFieldError}>{errors.description.message}</span>)}
                            </div>

                            <div className={styles.FormGroup}>
                                <div className={styles.FormField}>
                                    <label htmlFor="Deadline">Deadline</label>
                                    <input
                                        type="date"
                                        aria-label="Deadline"
                                        aria-invalid={!!errors.deadline} 
                                        defaultValue={todo.deadline || ''}
                                        {...register('deadline')} // Ensures the date is not in the past
                                    />
                                    {!!errors.deadline && (<span className={styles.FormFieldError}>{errors.deadline.message}</span>)}
                                </div>

                                <div className={styles.FormField}>
                                    <label          htmlFor="Priority">Priority</label>
                                    <select
                                    defaultValue={todo.priority??PRIORITY_DEFAULT} 
                                    aria-invalid={!!errors.priority}        
                                    id="Priority" 
                                    {...register('priority')}
                                    >
                                    {Object.entries(PRIORITIES).map(([key, {label}]) => (
                                        <option key={key} value={label}>
                                            {label}
                                        </option>
                                    ))}
                                    </select>
                                    {!!errors.priority && (<span className={styles.FormFieldError}>{errors.priority.message}</span>)}
                                </div>
                            </div>
                        </>
                    )}
                </div>

    )
}
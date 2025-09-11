import { useState } from 'react'
import styles from './App.module.css';
import {TodoForm} from  "./components/TodoForm/TodoForm.jsx";
import { TodoList } from './components/TodoList/TodoList.jsx';
import { TodoFilters } from './components/TodoFilters/TodoFilters.jsx';

function App() {
  const DEFAULT_TODOS = [
    {
      id: "1",
      name: "Buy groceries",
      description: "Milk, Bread, Eggs",
      deadline: "2023-10-15",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      name: "Walk the dog",
      description: "",
      deadline: "",
      priority: "none",
      completed: true,
    },
    {
      id: "3",
      name: "Read a book",
      description: "The Great Gatsby",
      deadline: "2023-10-20",
      priority: "medium",
      completed: false,
    },
    {
      id: "4",
      name: "Only name",
      description: "",
      deadline: "",
      priority: "none",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(DEFAULT_TODOS);

  const [filter, setFilters] = useState({});

  function handleAddTodo(newTodo) {
    setTodos((prevTodos) => {
      const maxId = prevTodos.length > 0 
        ? Math.max(...prevTodos.map(todo => parseInt(todo.id))) 
        : 0;
      
      return [
        ...prevTodos,
        { id: `${maxId + 1}`, ...newTodo }
      ];
    });
  }

  function handleUpdateTodo(id, newTodo) {
    setTodos((prevTodos) => 
      prevTodos.map(todo => 
        todo.id === id ? newTodo : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((prevTodos) => 
      prevTodos.filter(todo => todo.id !== id)
    );
  }

  function filterTodos(todo) {
    const { completed, priority } = filter;

    return(
      (completed ==="" || todo.completed===completed) &&
      (priority ==="" || todo.priority===priority)
    );
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/Todo.png" alt="Todo App Logo"/>
        <h2 className={styles.Title}>Todo App</h2>
      </header>
      <div className={styles.AppContainer}>
        <TodoForm onCreate={handleAddTodo}/>
        <TodoFilters  onFilter={setFilters}/>
        <TodoList 
          todos={todos.filter(filterTodos)}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}/>
      </div>
    </div>
  )
}

export default App
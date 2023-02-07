import { ToDoItem } from "./ToDoItem";
import { useState, useEffect } from 'react';

export const ToDoList = () => {

    const [todos, setTodos] = useState([]);

  useEffect( () => {
    fetch('http://localhost:3030/jsonstore/todos')
    .then(res => res.json())
    .then(result => {
      setTodos(Object.values(result));
    })
  }, []);

const toDoClickHandler = (todo) => {
    fetch(`http://localhost:3030/jsonstore/todos/${todo._id}`,
    {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            ...todo,
            isCompleted: !todo.isCompleted
        })
    })
    .then(res => res.json())
    .then(modifiedTodo => {
        setTodos(oldValues => oldValues.map(todo => todo._id == modifiedTodo._id ? modifiedTodo : todo))
    });
    
}

    return (
        <table className="table">
        <thead>
          <tr>
            <th className="table-header-task">Task</th>
            <th className="table-header-status">Status</th>
            <th className="table-header-action">Action</th>
          </tr>
        </thead>
        <tbody>

            {todos.map(todo => <ToDoItem key={todo._id} onClick={toDoClickHandler} {...todo}/>)}  
        </tbody>
      </table> 
    )
};
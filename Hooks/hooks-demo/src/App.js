import styles from './App.module.css';
import { CreateTask } from './components/CreateTask';
import { TaskList } from './components/TaskList';
import { TaskContext } from './contexts/TaskContext';
import { useFetch } from './hooks/useFetch';
import { useTodosApi } from './hooks/useTodosApi';

function App() {
    const [tasks, setTasks, isLoading] = useFetch('http://localhost:3030/jsonstore/todos', []);
    const { removeTodo, createTodo, updateTodo } = useTodosApi();

    const taskCreateHandler = async (newTask) => {
        const createdTask = await createTodo(newTask);
        setTasks(state => [
            ...state,
            createdTask 
        ]);
    };

    const taskDeleteHandler = (taskId) => {
        removeTodo(taskId)
            .then(() => setTasks(state => state.filter(x => x._id !== taskId)));
    };

    const toggleTasks = async (task) => {
        const updatedTask = {...task, isCompleted: !task.isCompleted};
        await updateTodo(task._id, updatedTask);

        setTasks(state => state.map(x => x._id === task._id ? updatedTask : x));
    }

    const editTasks = async (task) => {
        await updateTodo(task._id, task);

        setTasks(state => state.map(x => x._id === task._id ? task : x));
    }



    return (
        <TaskContext.Provider value={{tasks, taskDeleteHandler, toggleTasks, editTasks}}>
            <div className={styles['site-wrapper']}>
                <header>
                    <h1>To Do App</h1>
                </header>
                <main>
                    {isLoading
                        ? <p> Loading...</p>
                        : <TaskList tasks={tasks}/>}

                    <CreateTask taskCreateHandler={taskCreateHandler} />
                </main>
            </div>
        </TaskContext.Provider>
    );
}

export default App;

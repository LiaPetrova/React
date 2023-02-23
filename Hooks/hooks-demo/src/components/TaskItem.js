import { useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import styles from './TaskItem.module.css';

export const TaskItem = ({
    task
}) => {

    useEffect(() => {
        console.log('Mount');

        return () => {
            console.log('Unmount');
        }
    }, []);

    const { taskDeleteHandler, toggleTasks } = useContext(TaskContext);

    return (
        <>
            <li>
                <span onClick={() => toggleTasks(task._id)} className={task.isCompleted ? styles.completed : ''}>{task.text}</span>
                <button onClick={() => taskDeleteHandler(task._id)}>x</button>
            </li>

        </>
    );
};
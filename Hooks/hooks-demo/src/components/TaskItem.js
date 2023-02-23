import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import styles from './TaskItem.module.css';

export const TaskItem = ({
    task
}) => {

    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        console.log('Mount');

        return () => {
            console.log('Unmount');
        }
    }, []);

    const { taskDeleteHandler, toggleTasks, editTasks} = useContext(TaskContext);


    const classNames = [
        task.isCompleted ? styles.completed : '',
        styles['task-item']
    ];

    const taskEditHandler = () => {
        setIsEdit(true);
    };

    const onEdit = (e) => {
        e.preventDefault();
        const {text} = Object.fromEntries(new FormData(e.target));
        editTasks({...task, text});
        setIsEdit(false);
    }

    return (
        <li>
            {isEdit
                ? <form onSubmit={onEdit}>
                    <input type="text" defaultValue={task.text} name='text' />
                    <button>Edit</button>
                </form>

                : <>
                    <span onClick={() => toggleTasks(task)} className={classNames.join(' ')}>{task.text}</span>
                    <button onClick={() => taskDeleteHandler(task._id)}>x</button>
                    <button onClick={taskEditHandler}>Edit</button>
                </>
            }
        </li>
    );
};
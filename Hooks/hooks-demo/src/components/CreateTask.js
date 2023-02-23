import { useState } from "react";

export const CreateTask = ({ 
    taskCreateHandler
}) => {

    const [task, setTask ] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        taskCreateHandler(task);
        setTask('');
    };

    const onChange = (e) => {
        setTask(e.target.value);
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="New Task..." value={task} onChange={onChange}/>
            <button>Create</button>
        </form>
    );

}
export const ToDoItem = (props) => {

    let classname = 'todo';

    if(props.isCompleted === true) {
        classname += ' is-completed';
    }
    
    return (    
        <tr className={classname}>
        <td>{props.text}</td>
        <td>{props.isCompleted ? 'Complete' : 'Incomplete'}</td>
        <td className="todo-action">
          <button className="btn todo-btn"  onClick={() => props.onClick(props)}>Change status</button>
        </td>
      </tr>
    )
}
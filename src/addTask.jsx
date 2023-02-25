import React, { useContext, useState } from 'react';
import { HandleDisplayTask } from './DisplayTasks';
import { taskContext } from './taskContext';


const AddTask = (props)=>{

    let db = props.dbRequest

    console.log(db);

    const [task, setTask] = useState("")

    const {taskItems, setTaskItems} = useContext(taskContext)

    const handleSetTask = (e) =>{
        setTask(e.target.value)
    }

    const handleAddTask = (e) =>{
        e.preventDefault();
        let newItem = {
            title: task,
            done: false
        };

        let transaction = db.transaction(['tasks'], 'readwrite');
        let objectStore = transaction.objectStore('tasks');
        var request = objectStore.add(newItem);
        request.onsuccess = () => {
            setTask("")
            HandleDisplayTask(db, setTaskItems)
        };

    }

    return(
        <>
            <form onSubmit={handleAddTask}>
                <div className="form-group d-flex">
                    <input type="text" className="form-control" value={task} onChange={handleSetTask} />
                    <button type="submit" className="btn btn-success me-1">ثبت</button>
                </div>
            </form>
        </>
    )
}

export default AddTask;
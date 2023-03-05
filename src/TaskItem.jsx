import React, { useContext, useState } from 'react';
import DisplayTask from './DisplayTasks';
import { taskContext } from './taskContext';

const TaskItem = (props)=>{

    const [selectedTask, setSelectedTask] = useState({})
    const {taskItems, setTaskItems} = useContext(taskContext)

    const SelectTask= (t) =>{

        props.setSelectedTask(t)
        console.log(t);
    }
        return (
            <>
                <DisplayTask/>
                <ul className="list-group m-0 p-0 mt-2">
                    {   
                        taskItems.map(t=>(
                            <li onClick={()=> SelectTask(t)} className={`list-group-item d-flex justify-content-between
                                pointer list-group-item-action
                                ${selectedTask.id === t.id ? "list-group-item-secondary" : ""}
                            `}>
                            {t.title}
                            <span>
                                {/* <i className="me-3 pointer fas fa-edit text-success transition_200"></i> */}
                            </span>
                            </li>
                        ))
                    }
                </ul>
            </>    
        )
}

export default TaskItem;
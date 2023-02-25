import React, { useContext } from 'react';
import { taskContext } from './taskContext';

const TaskItem = ()=>{

    const {taskItems, setTaskItems} = useContext(taskContext)

        return (
            <ul className="list-group m-0 p-0 mt-2">
                {   
                    taskItems.map(t=>(
                        <li className="list-group-item d-flex justify-content-between">
                        {t.title}
                        <span>
                            {/* <i className="me-3 pointer fas fa-edit text-success transition_200"></i> */}
                        </span>
                        </li>
                    ))
                }
            </ul>    
        )
}

export default TaskItem;
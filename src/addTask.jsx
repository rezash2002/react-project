import React, {useState } from 'react';
import {AccessDB} from 'react-indexed-db';


const AddTask = ()=>{

    const [task, setTask] = useState("")
    
    const handleSetTask = (e) =>{
        setTask(e.target.value)
    }

    return(
            <AccessDB objectStore="tasks">
                {({ add }) => {
                    const handleClick = (e) => {
                        e.preventDefault();
                        if(task){
                            add({ title: task, time: 0, done:'false' }).then(
                                event => {
                                    setTask("")
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        }
                    };
                    return(
                        <form onSubmit={handleClick}>
                            <div className="form-group d-flex">
                                <input type="text" className="form-control" value={task} onChange={handleSetTask} />
                                <button type="submit" className="btn btn-danger me-1">ثبت</button>
                            </div>
                        </form>
                    ) 
                }}
            </AccessDB>
            
    )
}

export default AddTask;
import React, {useState } from 'react';
import { IndexedDB } from 'react-indexed-db';
import AddTask from './addTask';
import { taskContext } from './taskContext';
import TaskItem from './TaskItem';
import Timer from './time/timer';

export const App = ()=>{

    const [taskItems, setTaskItems] = useState([])

    const [selectedTask, setSelectedTask] = useState({})


    return (
        <>
            <IndexedDB
                name="mydb"
                version={1}
                objectStoresMeta={[
                {
                    store: 'tasks',
                    storeConfig: { keyPath: 'id', autoIncrement: true },
                    storeSchema: [
                    { name: 'title', keypath: 'title', options: { unique: false } },
                    { name: 'time', keypath: 'time', options: { unique: false } },
                    { name: 'done', keypath: 'done', options: { unique: false } }
                    ]
                }
                ]}
            >
                <Timer selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                <div className="container w-100 h-100 p-3" >
                    <div className="row h-100 justify-content-center align-align-items-start">
                        <div className="col-12 col-md-8 col-lg-6 bg-light shadow rounded-3 p-3 h_fit">
                            <taskContext.Provider value={{taskItems, setTaskItems}}>
                                <AddTask/>
                                <TaskItem selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
                            </taskContext.Provider>
                        </div>
                    </div>
                </div>
            </IndexedDB>
        </>

    ) 
}

export default App;

import React, { useContext, useState } from 'react';
import AddTask from './addTask';

import { HandleDisplayTask } from './DisplayTasks';
import { taskContext } from './taskContext';
import TaskItem from './TaskItem';

export const App = ()=>{

    const [taskItems, setTaskItems] = useState([])
    const [DB, setDB] = useState()

    let db;


window.onload = ()=>{

        let request = window.indexedDB.open('mydb');
        request.onsuccess=()=>{
            db = request.result;
            setDB(db)    
            HandleDisplayTask(db , setTaskItems)
        };

        request.onupgradeneeded = (e) =>{
            
            let db = e.target.result;


            let objectStore = db.createObjectStore('tasks', {
                keyPath: 'id',
                autoIncrement: true
            });

            objectStore.createIndex('title', 'title', { 
                unique: false 
            });

            objectStore.createIndex('done', 'done', {
                unique:false
            });

            console.log('Database setup complete');
        
        }
    }




    return (
        <div className="container w-100 h-100 p-3">
            <div className="row h-100 justify-content-center align-align-items-start">
                <div className="col-12 col-md-8 col-lg-6 bg-light shadow rounded-3 p-3 h_fit">
                    <taskContext.Provider value={{
                        taskItems, setTaskItems
                    }}>
                        <AddTask dbRequest={DB}/>
                        <TaskItem />
                    </taskContext.Provider>
                    
                </div>
            </div>
        </div>
    ) 


}

export default App;

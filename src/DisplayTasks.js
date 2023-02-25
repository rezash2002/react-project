
export const  HandleDisplayTask = (db, setTaskItems) =>{
    let newTaskItems = []

    let objectStore = db.transaction('tasks').objectStore('tasks');

    objectStore.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if(cursor) {
            newTaskItems = [...newTaskItems, {id:cursor.value.id, title:cursor.value.title, done:cursor.value.done}]
            TaskList()
            cursor.continue();
        }
    }

    const TaskList = () =>{
        setTaskItems(newTaskItems)
        
    }




}
   

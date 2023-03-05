import { useContext} from "react";
import {AccessDB} from "react-indexed-db"
import { taskContext } from "./taskContext";

const DisplayTask = () =>{

  const {taskItems, setTaskItems} = useContext(taskContext)


  return (
    <AccessDB objectStore="tasks">
      {({ getAll }) => {
        getAll().then(
          tasksFromDB => {
            setTaskItems(tasksFromDB)
          },
          error => {
            console.log(error);
          }
        );
      }}
    </AccessDB>

    )
}
   
export default DisplayTask;
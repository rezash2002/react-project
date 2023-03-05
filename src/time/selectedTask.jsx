
const SelectedTask = (props) =>{

    return(
        <div className="" style={{margin:20}}>
            <p>
                {props.selectedTask.title  ? "تسک انتخاب شده:" : "هنوز هیچ تسکی انتخاب نشده است"}
            </p>
            <p style={{textAlign:'center'}}  className="text-dark">
                {props.selectedTask.title ?  props.selectedTask.title : ""}
            </p>
        </div>
    )

}

export default SelectedTask;
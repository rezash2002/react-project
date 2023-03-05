
import React from 'react';
import { AccessDB } from 'react-indexed-db';
import SelectedTask from './selectedTask';


let interval;

class Timer extends React.PureComponent{

    constructor(){
        super();
        this.state={
            second : 0,
            minute:25,
            isStart: false,
            isRest:false,
        }

        let time;
        let updateTime;

    }

    

    startInterval = () =>{          
            if(this.state.isStart === false){
                this.setState({
                    isStart : true,
                })

    
                interval = setInterval(()=>{
                    
                    if(this.state.second === 0 && this.state.minute > 0){
            
                        this.setState({
                        second:59,
                        minute:this.state.minute - 1
                        })
                    }
    
                    if(this.state.second === 0 && this.state.minute === 0){
                        this.skipInterval()
                        return
                    }

                    if (this.state.second !== 0) {

                        this.setState({
                            second: this.state.second -1
                        })
    
                    }
                }, 1000)
            }
    }


    stopInterval = () =>{

        this.setState({
            isStart: false,
            })
        clearInterval(interval)
    }


    skipInterval = () =>{

        this.stopInterval()

        if(this.state.isRest === false){
            this.time = this.state.minute +":"+ this.state.second
            this.setState({
                second : 0,
                minute:5,
                isRest:true,
            })

            this.saveTime()

        }else{
            this.setState({
                second : 0,
                minute:25,
                isRest:false,
            })
        }
    }


    saveTime = () =>{
        
        let second = 60 - this.state.second;
        let minute = 24 - this.state.minute;
        this.time = minute + (second/60) + this.props.selectedTask.time

        this.props.setSelectedTask({
            id:this.props.selectedTask.id,
            title: this.props.selectedTask.title,
            time: this.time,
            done: this.props.selectedTask.done
        })
        this.updateTime()
    }


    render(){

        let m = this.state.minute
        let s = this.state.second
        return(
            <div className="timer-container w-100 h-100 bg-danger">

                <h2 className="timer bg-light ">
                    {`${s > 9 ? s : "0"+s} : ${m > 9 ? m : "0"+m}`}
                </h2>
                <div className="button_box">
                    <span className="btn btn-success pointer action_button rounded-6" onClick={this.startInterval}>start</span>
                    <span className="btn btn-warning pointer action_button rounded-6" onClick={this.stopInterval}>stop</span>
                    <AccessDB objectStore="tasks">
                        {({ update }) => {
                            this.updateTime = () =>{
                                update({ id: this.props.selectedTask.id, title: this.props.selectedTask.title, done:false, time:this.time }).then(
                                    () => {
                                    // Do something after update
                                    },
                                    error => {
                                    console.log(error);
                                    }
                                );
                            }
                            return (
                            <button ref={this.myInput} className="btn btn-primary pointer action_button rounded-6"
                                onClick={this.skipInterval}>
                                Skip
                            </button>
                            );
                        }}
                    </AccessDB>
                </div>
                <p onClick={this.updateTime}></p>
                <SelectedTask selectedTask={this.props.selectedTask}/>
            </div>
            
        )

    }
}

export default Timer;
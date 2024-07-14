import React, { useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './ToDo.css'
import rem from '../img/close.svg'
import ch from '../img/ch.svg'
import okk from '../img/ok.svg'


   
    let count = 0

    function ToDoList() {
    
    const [list,setList] = useState([]);
    const [task,setTask] = useState('');
    const [showEr,setShowEr] = useState(false);
    const [showTask,setShowTask] = useState(false);
    const [showRemoveAll,setShowRemoveAll] = useState(false);


    const input_ref = useRef()
    const er_ref = useRef()
    const task_ref = useRef()
    const remAll_ref = useRef()

    // -------------------------------

    let changeTask = (e) => {
            setTask( e.target.value);
     }


//   --------------------------------


    let addTask = (e) => {
        e.preventDefault()
        if (task){
            setShowEr(false)
            setShowTask(true)
            setList([task, ...list])
            setTask('');
            count++
          
        } 
        else {
            setShowEr(true)
        }
        
        input_ref.current.reset()
        showRa()
    }


    // ------------

    let deleteTask = (index) => {
        setList(list.filter((el,ind) => ind !== index))
        count --
       
        setShowEr(false)
        showRa()
        
    }

    
        let chTask = (index) => {
            let ch = prompt("Измените задачу")
            if(ch === null){
              return false  
            }
            let task = document.getElementById(index)
            if(ch.trim() && ch !== null){
                let arr = [...list]
                arr[index] = ch
                setList(arr)
                task.style.background = 'white'
            }
            
           
        }
    

    

    // ------------

    let showRa = () => {
        if(count > 1){
            setShowRemoveAll(true)
            
        }
        if(count < 2){
            setShowRemoveAll(false)
        }
     
     }

    // ------------

    let removeAll = () => {
        setList([])
        count = 0
        setShowRemoveAll(false)
        setShowEr(false)
    }

    let ok=(index)=>{
        
        let task = document.getElementById(index)
        
        
        if( task.style.background === ''){
            
            task.style.background = 'rgb(224, 224, 224)'
        }
        else if( task.style.background === 'rgb(224, 224, 224)'){
            
            task.style.background = 'white'
        }
        else if( task.style.background === 'white'){
            
            task.style.background = 'rgb(224, 224, 224)'
        }
        
        
    }
    
    
  return (
    <div className="container list">
        <form  ref ={input_ref} onSubmit={addTask} className="form">
        <textarea type="textarea" placeholder="Введите задачу..." onInput={changeTask} className="input_form" name="text"/>
        <button type="submit" className="btn_submit">Добавить</button>
      </form>
      <CSSTransition nodeRef={er_ref} in={showEr} classNames='alert' timeout={300} unmountOnExit>
         <div ref={er_ref} className="error" >Введите задачу</div>
     </CSSTransition>


     <TransitionGroup component = 'ul' className='task-items'>
        {list.map((el,index)=>{
            return (
                <CSSTransition nodeRef={task_ref} key = {index.toString()}  in={showTask} classNames='alert' timeout={300} unmountOnExit>
                <li ref={task_ref} className="task-item" id={index}>
                   <div className="task-p">{el}</div>
                    <div className="img-items">
                    <img  src = {okk} alt = "ok-task" className="ok-task"  onClick={() =>ok(index)} />
                    <img  src = {ch} alt = "remove_task" className="btn_remove_task"  onClick={() =>chTask(index)} />
                    <img  src = {rem} alt = "remove_task" className="btn_remove_task"  onClick={() =>  deleteTask(index)} />
                    </div>
                </li>
                </CSSTransition>
               
                
             ) 
        })}
      </TransitionGroup>
       
      <CSSTransition nodeRef={remAll_ref} in={showRemoveAll} classNames='alert' timeout={300} unmountOnExit>
        <button ref={remAll_ref} className="on" onClick={removeAll}>Удалить все</button>
      </CSSTransition>
    </div>
  );
}

export default ToDoList;

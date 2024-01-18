import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {

    const storedTasks = localStorage.getItem('Tasks');
    setAllTasks(storedTasks ? JSON.parse(storedTasks) : []);
  }, []);

  const taskChange = (e) => {
    setTask(e.target.value);
  };

  const descChange = (e) => {
    setDesc(e.target.value);
  };


  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { Task: task, Desc: desc };
      setAllTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setTask('');
      setDesc('');
    }
  };
  
  const deleteTask=(deletable)=>{

    let objectString = localStorage.getItem('Tasks')
    let object = objectString? JSON.parse(objectString) : []
    object=object.filter(temp => temp.Task != deletable)
    localStorage.setItem('Tasks',JSON.stringify(object))
    setAllTasks(object);

  }

  const editTask = (task,desc)=>{
    setTask(task)
    setDesc(desc)
    deleteTask(task)

  }

  return (
    <>
      <div>My Todo List</div>

      <label htmlFor="task">Task: </label>
      <input type="text" id="task" value={task} onChange={taskChange} />

      <br />

      <label htmlFor="desc">Description: </label>
      <input type="text" id="desc" value={desc} onChange={descChange} />

      <br />

      <button onClick={addTask}>Add Task</button>

      <br />
      <br />
      <hr />

      <div>
        <h4>List</h4>
      </div>

      <>
        {allTasks.map((element, index) => (
           // Check if the task is not an empty string
            element.Task && (<div key={index}>
              <span className='desc'>{index+1} : </span>
              <span className='title'>Task :</span> <span className='desc'>{element.Task}</span>
              <span className='title'>Description : </span> <span className='desc'> {element.Desc}</span>
              <span><button onClick={()=>editTask(element.Task,element.Desc)}>Edit</button></span>
              <span><button onClick={()=>deleteTask(element.Task)}>Delete</button></span>
            </div>
          )
        ))}

      </>
    </>
  );
}

export default App;


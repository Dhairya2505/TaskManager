import React, { useState, useEffect } from 'react';
import './App.css';
import './taskDone.css'

// ...

function App() {
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [Priority,setPriority] =useState('');
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
      const newTask = { Task: task, Desc: desc, isChecked: false, priority : Priority};
      setAllTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setTask('');
      setDesc('');
      setPriority('Low');
    }
  };

  const deleteTask = (deletable) => {
    let objectString = localStorage.getItem('Tasks');
    let object = objectString ? JSON.parse(objectString) : [];
    object = object.filter((temp) => temp.Task !== deletable);
    localStorage.setItem('Tasks', JSON.stringify(object));
    setAllTasks(object);
  };

  const editTask = (task, desc) => {
    setTask(task);
    setDesc(desc);
    deleteTask(task);
  };

  const checkboxClicked = (index) => {
    setAllTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, isChecked: !task.isChecked } : task
      );
      localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const priorityChanged=(index,event)=>{
    console.log(index)

    console.log(event.target.value)
    setAllTasks((prevTasks) =>{
      const updatedTasks = prevTasks.map((tasks,i)=>
        i===index ? {...tasks,priority: event.target.value} : tasks
      );
      localStorage.setItem('Tasks',JSON.stringify(updatedTasks))
      return updatedTasks;
    })
  }

  const changePriority=(event)=>{
    setPriority(event.target.value)
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

      <label htmlFor="">Priorirty : </label>
      <select name="" id="" value={Priority} onChange={changePriority}>
        <option value="Low" selected>Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

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
          element.Task && (
            <div key={index}>
              <span className={`index ${element.isChecked ? "checked" : ""}`}>{index + 1} : </span>
              <span>
                <input
                  type="checkbox"
                  checked={element.isChecked}
                  className='desc'
                  onChange={() => checkboxClicked(index)}
                />
              </span>
              <span className={`title ${element.isChecked ? "checked" : ""}`}>
                Task :
              </span>{' '}
              <span className={`desc ${element.isChecked ? "checked" : ""}`}>
                {element.Task}
              </span>
              <span className={`title ${element.isChecked ? "checked" : ""}`}>
                Description :
              </span>{' '}
              <span className={`desc ${element.isChecked ? "checked" : ""}`}>
                {element.Desc}
              </span>
              <select value={element.priority} onChange={()=>priorityChanged(index,event)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <span>
                <button onClick={() => editTask(element.Task, element.Desc)}>Edit</button>
              </span>
              <span>
                <button onClick={() => deleteTask(element.Task)}>Delete</button>
              </span>
            </div>
          )
        ))}
      </>
    </>
  );
}

export default App;



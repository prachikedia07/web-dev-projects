import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import "@fontsource/poppins";           


function App() {

  const [theme, setTheme] = useState("bluepink"); // default theme

const [todo, setTodo] = useState('')
const [todos, setTodos] = useState([])
const [showFinished, setshowFinished] = useState(true)

 useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

useEffect(() => {
 let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

const saveToLS = (params) => {
  localStorage.setItem('todos', JSON.stringify(todos)) // Save todos to localStorage
}

const toggleFinished = (e) => {
  setshowFinished(!showFinished) // Toggle the visibility of finished todos
}

// Functions to handle adding, editing, deleting, and toggling todos

  const handleEdit= (e, id) => {
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) // Update todos state with the filtered array
    saveToLS() // Save updated todos to localStorage
  }
  const handleDelete= (e, id)=>{
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos) // Update todos state with the filtered array
    saveToLS() // Save updated todos to localStorage
  }

  const handleAdd = () => {
    // Logic to add a new todo
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo('') // Clear input after adding 
    saveToLS() // Save updated todos to localStorage
  }

  const handleChange = (e) => {
    setTodo(e.target.value) // Update todo state with input value
  }

  const handleCheckbox = (e) => {
    let id  = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle completion status
    setTodos(newTodos) // Update todos state with the modified array
    saveToLS() // Save updated todos to localStorage
  }

  return (
    <>
    <Navbar setTheme={setTheme} />  
    <div className={`${theme} min-h-screen transition-all`}>
    <div className="todo mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-white/70 backdrop-blur-lg shadow-xl min-h-[80vh] md:w-[48%] transition-all">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <div className="flex">
        <input onChange={handleChange} value={todo} type="text" placeholder='Enter your task...' className='w-full rounded-full px-5 py-1 border border-gray-300 focus:outline-none 
               focus:ring-2  text-gray-800 shadow-sm'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='btn ml-3 px-6 py-2 rounded-full text-white font-semibold  disabled:cursor-not-allowed 
               transition-transform transform hover:scale-105'>Save</button>
        </div>
      </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished}/>
        <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-extrabold'>Your Todos </h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 text-center text-lg font-bold'>No Todos Added</div>}
          {todos.map(item => {

          return (showFinished || !item.isCompleted) && <div key={item.id} className={`flex justify-between items-center p-4 my-3 rounded-xl shadow-md transition-all hover:translate-x-1 ${item.isCompleted ? "bg-gray-100 text-gray-900" : "bg-white"}`}>
            <div className="flex gap-4">
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=""/>
            <div className={item.isCompleted?"line-through":""} id='todotext'>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e, item.id)} className='btn hover:font-extrabold p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit/></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='btn hover:font-extrabold p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete/></button>
            </div>
          </div>
          })}
        </div>
      </div>
      
  </div>
    </>
  )
}

export default App

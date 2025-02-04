import {store }from '../Store/store'
import './App.css'
import { Provider } from 'react-redux'
import AddHabitForm from '../Components/AddHabitForm'
import HabitsList from '../Components/HabitsList'

function App() {


  return (
    
    <>
    <Provider store={store}>
    <h1 className='text-4xl text-blue-500 flex items-center justify-center'>Habit Tracker App</h1>
    <AddHabitForm/>
    <HabitsList/>
    </Provider>
    
   
   
    </>
  )
}

export default App

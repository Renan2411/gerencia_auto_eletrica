import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { OficinaProvider } from './context/OficinaContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <OficinaProvider>
        <SideBar></SideBar>
      </OficinaProvider>

    </>
  )
}

export default App

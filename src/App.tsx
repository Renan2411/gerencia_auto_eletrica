import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { OficinaProvider } from './context/OficinaContext'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <OficinaProvider>
          <SideBar></SideBar>
        </OficinaProvider>
      </LocalizationProvider>

    </>
  )
}

export default App

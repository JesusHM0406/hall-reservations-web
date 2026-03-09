import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <button
      className='border-2 border-indigo-400 rounded-sm py-3 px-4 uppercase font-bold'
      onClick={() => setCount((count) => count + 1)}
    >
      count is {count}
    </button>
  )
}

export default App

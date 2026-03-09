import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <button
      className='border-2 border-indigo-400 rounded-sm py-3 px-4 uppercase font-bold'
      onClick={() => setCount((prevCount) => prevCount + 1)}
    >
      count is {count}
    </button>
  )
}

export default App

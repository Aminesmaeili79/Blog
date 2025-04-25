import { useState } from 'react'
import BlogManager from "./components/BlogManager.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BlogManager/>
    </>
  )
}

export default App

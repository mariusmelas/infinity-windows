import React, { useState, useRef, useEffect } from 'react'
import Window from './components/window/Window.js'

function App() {
  const forwardRef = useRef(0)
  const [mouseIsUp, setMouseisUp] = useState(true)
  const [size, setSize] = useState([0, 0])
  const [highestZindex, setHighestZindex] = useState(0)

  useEffect(() => {
    const width = forwardRef.current.offsetWidth
    const height = forwardRef.current.offsetHeight
    setSize([width, height])
  }, [])

  const handleMouseUp = function(e) {
    setMouseisUp(true)
  }

  const handleMouseDown = function(e) {
    e.preventDefault()
    setMouseisUp(false)
  }

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={forwardRef}
      style={{
        backgroundColor: 'azure',
        width: '100v',
        height: '100vh',
      }}
    >
      <Window
        isRoot={true}
        forwardRef={forwardRef}
        parentSize={[size[0], size[1]]}
        mouseIsUp={mouseIsUp}
        highestZindex={highestZindex}
        setHighestZindex={setHighestZindex}
      />
    </div>
  )
}
export default App

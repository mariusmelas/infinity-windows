import React, { useEffect, useRef, useState } from 'react'
import WindowContent from './WindowContent.js'
import {
  Corner,
  BottomLeftCorner,
  BottomRightCorner,
  TopBar,
  WindowContainer,
  CloseWindow,
  WindowRoot,
} from './style.js'

function Window(props) {
  const [width, setWidth] = useState(undefined)
  const [height, setHeight] = useState(undefined)
  const [widthInPercent, setWidthInPercent] = useState(50)
  const [heightInPercent, setHeightInPercent] = useState(50)
  const [translateX, setTranslateX] = useState(undefined)
  const [translateY, setTranslateY] = useState(undefined)
  const [translateXinPercent, setTranslateXinPercent] = useState(
    5 + props.id * 5,
  )
  const [translateYinPercent, setTranslateYinPercent] = useState(
    5 + props.id * 10,
  )
  const [resize, setResize] = useState(false)
  const [resizeCorner, setResizeCorner] = useState(false)
  const [move, setMove] = useState(false)
  const [mousePos, setMousePos] = useState(false)
  const [openWindows, setOpenWindows] = useState([])
  const [highestZindex, setHighestZindex] = useState(0)
  const [backgroundColor, setBackgroundCOlor] = useState([
    Math.random() * 360,
    Math.random() * 360,
  ])

  const windowRef = useRef(0)

  useEffect(() => {
    if (props.mouseIsUp) {
      // When resizing or moving is finished, calculate and set relative size.
      if (resize || move) {
        setTranslateXinPercent(
          (translateX / windowRef.current.offsetWidth) * 100,
        )
        setTranslateYinPercent(
          (translateY / windowRef.current.offsetHeight) * 100,
        )
        setTranslateX(undefined)
        setTranslateY(undefined)
      }

      if (resize) {
        setWidthInPercent((width / props.parentSize[0]) * 100)
        setHeightInPercent((height / props.parentSize[1]) * 100)
        setWidth(undefined)
        setHeight(undefined)
      }

      setMove(false)
      setResize(false)
    }
  }, [props.mouseIsUp])

  useEffect(() => {
    function mouseMove(e) {
      if (resize) {
        let newWidth, newHeight
        if (resizeCorner === 'bottomLeft') {
          // Resizing is happening from the bottom left
          newWidth = width + mousePos[0] - e.clientX
          newHeight = height + e.clientY - mousePos[1]
          if (newWidth > 100) {
            // Translate window to mouse x position
            setTranslateX(translateX + e.clientX - mousePos[0])
          }
        } else if (resizeCorner === 'bottomRight') {
          // Resizing is happening from the bottom righth
          newWidth = width + e.clientX - mousePos[0]
          newHeight = height + e.clientY - mousePos[1]
        }

        // Check that the window is not too small before setting new size.
        if (newWidth > 100) {
          setWidth(newWidth)
        }
        if (newHeight > 100) {
          setHeight(newHeight)
        }
      } else if (move) {
        setTranslateX(translateX + e.clientX - mousePos[0])
        setTranslateY(translateY + e.clientY - mousePos[1])
      }
    }

    if (resize || move) {
      props.forwardRef.current.addEventListener(
        'mousemove',
        mouseMove,
        true,
      )

      return () => {
        props.forwardRef.current.removeEventListener(
          'mousemove',
          mouseMove,
          true,
        )
      }
    } else {
      props.forwardRef.current.removeEventListener(
        'mousemove',
        mouseMove,
        true,
      )
    }
  }, [resize, move])

  const handleMouseDown = function(e, corner) {
    setTranslateX(
      (translateXinPercent / 100) * windowRef.current.offsetWidth,
    )
    setTranslateY(
      (translateYinPercent / 100) * windowRef.current.offsetHeight,
    )

    setWidth(windowRef.current.offsetWidth)
    setHeight(windowRef.current.offsetHeight)
    setResizeCorner(corner || false)
    setMousePos([e.clientX, e.clientY])
    setResize(true)
  }

  const handleMoveMouseDown = function(e) {
    setTranslateX(
      (translateXinPercent / 100) * windowRef.current.offsetWidth,
    )
    setTranslateY(
      (translateYinPercent / 100) * windowRef.current.offsetHeight,
    )

    setMousePos([e.clientX, e.clientY])

    setMove(true)
  }

  const handleCloseWindow = function(e, id) {
    let updateOpenWindows = [...openWindows].filter(e => e.id !== id)
    setOpenWindows(updateOpenWindows)
  }

  const handleIconClick = function(e) {
    let updateOpenWindows = [...openWindows]

    updateOpenWindows.push({
      id:
        updateOpenWindows.length > 0
          ? updateOpenWindows[updateOpenWindows.length - 1].id + 1
          : 0,
      mode: 'open',
      Win: Window,
      zIndex: highestZindex + 1,
    })
    setHighestZindex(highestZindex + 1)
    setOpenWindows(updateOpenWindows)
  }

  const handleZindex = function(e, id) {
    if (e.target && e.target.id === 'close') {
      return false
    }
    let updateOpenWindows = [...openWindows]
    let updateZindex = highestZindex + 1
    updateOpenWindows.forEach((e, i) => {
      if (e.id === id) {
        updateOpenWindows[i].zIndex = updateZindex
      }
    })
    setOpenWindows(updateOpenWindows)
    setHighestZindex(updateZindex)
  }

  return props.isRoot ? (
    <WindowRoot>
      <WindowContent
        openWindows={openWindows}
        handleIconClick={handleIconClick}
        handleCloseWindow={handleCloseWindow}
        forwardRef={props.forwardRef}
        mouseIsUp={props.mouseIsUp}
        parentSize={[
          windowRef.current.offsetWidth - 40,
          windowRef.current.offsetHeight - 40,
        ]}
        handleZindex={handleZindex}
        highestZindex={highestZindex}
        backgroundColor={backgroundColor}
      />
    </WindowRoot>
  ) : (
    <WindowContainer
      ref={windowRef}
      onMouseDown={props.handleZindex}
      width={width}
      height={height}
      widthInPercent={widthInPercent}
      heightInPercent={heightInPercent}
      translateX={translateX}
      translateY={translateY}
      translateXinPercent={translateXinPercent}
      translateYinPercent={translateYinPercent}
      zIndex={props.zIndex}
    >
      <TopBar
        onMouseDown={handleMoveMouseDown}
        backgroundColor={backgroundColor}
      >
        <Corner onMouseDown={handleMouseDown} />
        <div />
        <CloseWindow
          id={'close'}
          onMouseDown={e => props.handleCloseWindow(e, props.id)}
          backgroundColor={backgroundColor}
        />
      </TopBar>
      <WindowContent
        openWindows={openWindows}
        handleIconClick={handleIconClick}
        handleCloseWindow={handleCloseWindow}
        handleMouseDown={handleMouseDown}
        forwardRef={props.forwardRef}
        mouseIsUp={props.mouseIsUp}
        parentSize={[
          windowRef.current.offsetWidth - 40,
          windowRef.current.offsetHeight - 40,
        ]}
        handleZindex={handleZindex}
        highestZindex={highestZindex}
        backgroundColor={backgroundColor}
      />

      <BottomLeftCorner
        onMouseDown={e => handleMouseDown(e, 'bottomLeft')}
      />

      <BottomRightCorner
        onMouseDown={e => handleMouseDown(e, 'bottomRight')}
      />
    </WindowContainer>
  )
}

export default Window

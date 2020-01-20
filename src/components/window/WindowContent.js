import React from 'react'
import styled from 'styled-components'
import Dock from './Dock.js'
import Icon from './Icon.js'
import Window from './Window.js'

const WindowContentStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    hsl(${props => props.backgroundColor[0]}, 50%, 50%) 0%,
    hsl(${props => props.backgroundColor[1]}, 50%, 50%) 100%
  );
  overflow: hidden;
  box-shadow: 3px 3px 12px -5px rgba(131, 3, 250, 1);
`
// ${props => props.backgroundColor[1]

function WindowContent(props) {
  return (
    <WindowContentStyled backgroundColor={props.backgroundColor}>
      <Icon
        handleIconClick={props.handleIconClick}
        windowWidth={props.parentSize[0]}
        windowHeight={props.parentSize[1]}
      />
      {props.openWindows.map(
        e =>
          e.mode === 'open' && (
            <React.Fragment key={e.id}>
              <Window
                id={e.id}
                handleCloseWindow={props.handleCloseWindow}
                forwardRef={props.forwardRef}
                mouseIsUp={props.mouseIsUp}
                parentSize={props.parentSize}
                handleZindex={t => props.handleZindex(t, e.id)}
                zIndex={e.zIndex}
              />
            </React.Fragment>
          ),
      )}

      <Dock
        openWindows={props.openWindows}
        handleZindex={props.handleZindex}
        highestZindex={props.highestZindex}
        activeColor={props.backgroundColor[0]}
      />
    </WindowContentStyled>
  )
}

export default WindowContent

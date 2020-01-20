import React from 'react'
import styled from 'styled-components'

const DockContainer = styled.div`
  z-index: 99999;
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 4px;
  width: 99%;
  display: grid;
  grid-template-columns: repeat(40, auto);
  grid-gap: 5px;
  align-items: center;
  justify-items: center;
`

const DockTab = styled.div`
  position: relative;
  margin-left: 2px;
  border-radius: 50%;
  width: 95%;
  height: 0;
  padding-top: 100%;
  border: 1px solid white;
`

function Dock(props) {
  return (
    <DockContainer>
      {props.openWindows &&
        props.openWindows.map((e, i) => (
          <DockTab
            active={e.zIndex === props.highestZindex ? true : false}
            key={Math.random() * 10000}
            onMouseDown={() =>
              props.handleZindex && props.handleZindex(false, e.id)
            }
          >
            {e.zIndex === props.highestZindex && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',

                  background: 'white',
                  opacity: 0.8,
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                }}
              ></div>
            )}
          </DockTab>
        ))}
    </DockContainer>
  )
}

export default Dock

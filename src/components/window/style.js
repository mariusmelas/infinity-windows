import styled from 'styled-components'

export const WindowRoot = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: pink;
  overflow: hidden;
`

export const WindowContainer = styled.div.attrs(props => ({
  style: {
    zIndex: props.zIndex,
    width: props.width || props.widthInPercent + '%',
    height: props.height || props.heightInPercent + '%',
    transform: `translate(${
      props.translateX
        ? props.translateX + 'px'
        : props.translateXinPercent + '%'
    },
        ${
          props.translateY
            ? props.translateY + 'px'
            : props.translateYinPercent + '%'
        })`,
  },
}))`
  position: absolute;
  min-width: 100px;
  min-height: 100px;
  display: grid;
  grid-template-rows: 20px 1fr;
  justify-items: center;
  align-items: center;
  padding: 1px;
`

export const TopBar = styled.div`
  display: grid;
  grid-template-columns: 20px auto 20px;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 20px;
  cursor: grab;
  background-color: hsl(
    ${props => props.backgroundColor[0]},
    40%,
    80%
  );
`

export const CloseWindow = styled.div`
  border-radius: 50%;
  width: 95%;
  height: 95%;
  background: hsl(${props => props.backgroundColor[0]}, 80%, 50%);
`

export const WindowContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: silver;
  overflow: hidden;
`

export const Corner = styled.div`
  width: 100%;
  height: 100%;
`
export const BottomLeftCorner = styled.div`
  z-index: 99999999;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  cursor: sw-resize;
`

export const BottomRightCorner = styled.div`
  z-index: 99999999;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: se-resize;
`

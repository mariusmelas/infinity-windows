import React from 'react'
import styled from 'styled-components'

const IconImg = styled.img`
  position: absolute;
  top: 5%;
  right: 5%;
  width: 4%;
  height: auto;
  cursor: pointer;
`

function Icon(props) {
  return (
    <div>
      <IconImg
        src="/newWindowIcon.png"
        onClick={props.handleIconClick}
      />
    </div>
  )
}

export default Icon

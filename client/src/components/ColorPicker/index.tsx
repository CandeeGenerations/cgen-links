/** @jsx jsx */
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'
import React, {useState} from 'react'
import {SketchPicker} from 'react-color'
import Button from 'antd/es/button'

export interface ColorPickerProps {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

const ColorPicker = (props: ColorPickerProps) => {
  const [display, setDisplay] = useState(false)
  const [originalColor] = useState(props.value || props.defaultValue || '#000')
  const [color, setColor] = useState(
    props.value || props.defaultValue || '#000',
  )

  const onHide = () => {
    setDisplay(false)

    if (props.onChange) {
      props.onChange(color)
    }
  }

  const resetColor = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setColor(originalColor)
  }

  return (
    <React.Fragment>
      <SwatchDiv onClick={() => (display ? onHide() : setDisplay(true))}>
        <ColorDiv css={{background: color}} />
      </SwatchDiv>

      {display && (
        <PopoverDiv>
          <CoverDiv onClick={onHide} />

          <SketchPicker
            disableAlpha
            color={color}
            onChange={({hex}) => setColor(hex)}
          />
        </PopoverDiv>
      )}

      <div>
        <small>
          <a href="#" onClick={resetColor}>
            Reset
          </a>
        </small>
      </div>
    </React.Fragment>
  )
}

const SwatchDiv = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`

const ColorDiv = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
`

const PopoverDiv = styled.div`
  position: absolute;
  z-index: 2;
`

const CoverDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

export default ColorPicker

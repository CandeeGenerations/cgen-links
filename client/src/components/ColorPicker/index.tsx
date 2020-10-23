import React from 'react'
import {SketchPicker} from 'react-color'

export interface ColorPickerProps {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

const ColorPicker = (props: ColorPickerProps) => {
  return (
    <SketchPicker
      color={props.value || props.defaultValue || '#000'}
      onChangeComplete={({hex}) => props.onChange && props.onChange(hex)}
    />
  )
}

export default ColorPicker

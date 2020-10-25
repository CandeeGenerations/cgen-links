import React from 'react'

export interface NullableFieldProps {
  value?: string | JSX.Element
}

const NullableField = (props: NullableFieldProps) => {
  return props.value ? <>{props.value}</> : <em>None</em>
}

export default NullableField

import React from 'react'

export default function Ul(props) {
  return (
    <ul style={props.style}>
        {props.children}
    </ul>
  )
}

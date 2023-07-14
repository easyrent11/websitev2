import React from 'react'


export default function Button(props) {
  return (
    <button type={props.type !=null ? props.type : null} style={props.style} onClick={props.onClick}>
        {props.name}
    </button>
  )
}

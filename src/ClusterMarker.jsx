import React from 'react'

export const ClusterMarker = (props) => {
  const [x, y] = props.geometry.coordinates
  const [left, top] = props.latLngToPixel([y, x])
  const [width, height] = [30, 30]

  return (
    <div
      className='cluster-marker'
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      style={{
        cursor: 'pointer',
        position: 'absolute',
        transform: `translate(${left - width / 2}px, ${top - (height - 1)}px)`
      }}
    >
      <div>
        <span>{props.component?.length}</span>
      </div>
    </div>
  )
}

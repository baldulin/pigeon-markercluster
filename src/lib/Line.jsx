import React from 'react'

export const Line = ({ width, height, a, b }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ position: 'absolute', left: '0px', top: '0px' }}
    >
      <path
        d={`M ${a[0]} ${a[1]} ${b[0]} ${b[1]} Z`}
        stroke='black'
        strokeWidth='1'
      />
    </svg>
  )
}

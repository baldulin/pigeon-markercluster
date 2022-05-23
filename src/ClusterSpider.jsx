import React from 'react'

const radialGrowth = (i) => Math.sqrt(i + 1) * 40
const tangentialSpeed = (i) => Math.sqrt(i + 1) * Math.PI

export const ClusterSpider = ({ component }) => (
  <>
    {props.component.map((marker, i) => (
      <Line
        key={i}
        width={props.mapState.width}
        height={props.mapState.height}
        a={[props.left, props.top]}
        b={[
          props.left + radialGrowth(i) * Math.sin(tangentialSpeed(i)),
          props.top + radialGrowth(i) * Math.cos(tangentialSpeed(i))
        ]}
      />
    ))}
    {props.component.map((marker, i) =>
      React.cloneElement(marker, {
        ...props,
        left: props.left + radialGrowth(i) * Math.sin(tangentialSpeed(i)),
        top: props.top + radialGrowth(i) * Math.cos(tangentialSpeed(i))
      })
    )}
  </>
)

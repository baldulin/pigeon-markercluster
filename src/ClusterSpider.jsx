import React, { Fragment } from 'react'
import { Line } from './Line'

const radialGrowth = (i) => Math.sqrt(i + 1) * 40
const tangentialSpeed = (i) => Math.sqrt(i + 1) * Math.PI

export const ClusterSpider = ({
  component,
  left,
  top,
  mapState: { width, height },
  ...props
}) => (
  <>
    {component.map((marker, i) => (
      <Line
        key={i}
        width={width}
        height={height}
        a={[left, top]}
        b={[
          left + radialGrowth(i) * Math.sin(tangentialSpeed(i)),
          top + radialGrowth(i) * Math.cos(tangentialSpeed(i))
        ]}
      />
    ))}
    {component.map((marker, i) =>
      React.cloneElement(marker, {
        ...props,
        left: left + radialGrowth(i) * Math.sin(tangentialSpeed(i)),
        top: top + radialGrowth(i) * Math.cos(tangentialSpeed(i))
      })
    )}
  </>
)

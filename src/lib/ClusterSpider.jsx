import React, { Fragment } from 'react'
import { Line } from './Line'

// equidistant points on a archimedian spiral:
// https://math.stackexchange.com/a/1371761
const baseSpiderMarkerPositioner = (i, N) => {
  const theta = Math.sqrt((i + 1) / 100) * 25
  return [10 * theta * Math.sin(theta), 10 * theta * Math.cos(theta)]
}

const zip = (arr1, ...arrs) =>
  arr1.map((value, i) => [value, ...arrs.map((arr) => arr[i])])

export const ClusterSpider = ({
  component,
  left,
  top,
  mapState,
  spiderMarkerPositioner = baseSpiderMarkerPositioner,
  ...props
}) => (
  <>
    {component.map((marker, i) => (
      <Line
        key={i}
        width={mapState.width}
        height={mapState.height}
        a={[left, top]}
        b={zip([left, top], spiderMarkerPositioner(i, component.length)).map(
          ([v1, v2]) => v1 + v2
        )}
      />
    ))}
    {component.map((marker, i) =>
      React.cloneElement(marker, {
        ...props,
        mapState,
        ...Object.fromEntries(
          zip(
            [
              ['left', left],
              ['top', top]
            ],
            spiderMarkerPositioner(i, component.length)
          ).map(([[prop, v1], v2]) => [prop, v1 + v2])
        )
      })
    )}
  </>
)

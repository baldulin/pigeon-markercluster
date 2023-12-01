import React, { useMemo } from 'react'
import { GeoJson } from 'pigeon-maps'

export const ClusterHull = ({ hull, ...props }) => {
  const geoJsonData = useMemo(
    () => ({
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [hull]
          }
        }
      ]
    }),
    [hull]
  )

  return (
    <GeoJson
      {...props}
      data={geoJsonData}
      svgAttributes={{
        strokeWidth: '3',
        strokeDasharray: '7,7',
        stroke: '#c20871',
        fill: '#c2087130',
        r: '30'
      }}
    />
  )
}

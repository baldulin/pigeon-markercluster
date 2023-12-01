import React, { memo, useMemo } from 'react'
import { GeoJson } from 'pigeon-maps'

export const ClusterHull = memo(({ hull, ...props }) => {
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

  return <GeoJson {...props} data={geoJsonData} />
})

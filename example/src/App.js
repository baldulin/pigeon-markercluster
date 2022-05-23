import React, { useMemo } from 'react'

import { Map, Marker, ZoomControl } from 'pigeon-maps'
import { SuperCluster } from 'pigeon-cluster'
import points from './points.json'

const App = () => {
  const markers = useMemo(
    () => points.map((coords, i) => <Marker key={i} anchor={coords} />),
    []
  )

  return (
    <div>
      <Map
        center={[12.17506, 53.7942]}
        zoom={6}
        defaultWidth={600}
        height={400}
      >
        <ZoomControl/>
        <SuperCluster>{markers}</SuperCluster>
      </Map>
    </div>
  )
}

export default App

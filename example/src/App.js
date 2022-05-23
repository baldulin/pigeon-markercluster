import React, { useMemo, useState } from 'react'

import { Map, Marker, ZoomControl } from 'pigeon-maps'
import { SuperCluster } from 'pigeon-cluster'
import points from './points.json'

const App = () => {
  const [state, setState] = useState({
    center: [12.17506, 53.7942],
    zoom: 6
  })
  const { center, zoom } = state

  const markers = useMemo(
    () => points.map((coords, i) => <Marker key={i} anchor={coords} />),
    [points]
  )

  return (
    <div>
      <Map
        limitBounds='edge'
        center={center}
        zoom={zoom}
        defaultWidth={600}
        height={400}
      >
        <SuperCluster>{markers}</SuperCluster>
      </Map>
    </div>
  )
}

export default App

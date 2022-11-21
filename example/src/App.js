import React, { useMemo } from 'react'

import { Map, ZoomControl } from 'pigeon-maps'
import { SuperCluster } from 'pigeon-markercluster'
import points from './points.json'
import { Marker } from './Marker'
import { ClusterMarker } from './ClusterMarker'
import { ClusterHull } from './ClusterHull'

const App = () => {
  const markers = useMemo(
    () =>
      points.map((coords, i) => (
        <Marker key={i} anchor={coords}>
          <div
            style={{
              width: '200px',
              minHeight: '300px',
              backgroundColor: 'white',
              textAlign: 'justify',
              padding: '10px'
            }}
          >
            <b>Lorem Ipsum</b> is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
            <br />
            <b>Coordinates:</b> [{coords[0]}, {coords[1]}]
          </div>
        </Marker>
      )),
    []
  )

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '600px' }}>
      <Map
        center={[53.7942, 12.17506]}
        zoom={6}
        defaultWidth={600}
        height={800}
      >
        <ZoomControl />
        <SuperCluster
          hullComponent={ClusterHull}
          markerComponent={ClusterMarker}
          radius={120}
        >
          {markers}
        </SuperCluster>
      </Map>
    </div>
  )
}

export default App

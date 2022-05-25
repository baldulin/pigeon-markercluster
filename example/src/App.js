import React, { useMemo } from 'react'

import { GeoJson, Map, ZoomControl, Overlay } from 'pigeon-maps'
import { SuperCluster } from 'pigeon-cluster'
import points from './points.json'
import customMarker from './customMarker.svg'

const CustomClusterHull = ({ hull, ...props }) => {
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

const CustomMarker = (props) => {
  const [width, height] = [20, 20]

  return (
    <img
      alt='Custom Marker'
      width={width}
      height={height}
      src={customMarker}
      style={{
        transform: `translate(${props.left - width / 2}px, ${
          props.top - (height - 1)
        }px)`
      }}
    />
  )
}

const CustomClusterMarker = (props) => (
  <Overlay {...props} anchor={props.geometry.coordinates}>
    <div
      className='cluster-marker'
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      <div>
        <span>{props.component?.length}</span>
      </div>
    </div>
  </Overlay>
)

const App = () => {
  const markers = useMemo(
    () => points.map((coords, i) => <CustomMarker key={i} anchor={coords} />),
    []
  )

  return (
    <div>
      <Map
        center={[53.7942, 12.17506]}
        zoom={6}
        defaultWidth={600}
        height={800}
      >
        <ZoomControl />
        <SuperCluster
          hullComponent={CustomClusterHull}
          markerComponent={CustomClusterMarker}
          radius={120}
        >
          {markers}
        </SuperCluster>
      </Map>
    </div>
  )
}

export default App

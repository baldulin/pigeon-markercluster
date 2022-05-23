import React, { useState, useMemo, useCallback } from 'react'
import { Marker, GeoJson } from 'pigeon-maps'
import { ClusterSpider } from './ClusterSpider'
import { ClusterHull } from './ClusterHull'

export const ClusterMarker = (props) => {
  const { spiderComponent, markerComponent } = props
  const MarkerComponent = markerComponent === undefined ? Marker : null
  const SpiderComponent =
    props.spiderComponent === undefined ? ClusterSpider : null
  const HullComponent = props.hullComponent === undefined ? GeoJson : null

  const { hull } = props
  const [hover, setHover] = useState(false)
  const [spiderify, setSpiderify] = useState(false)
  const max = useMemo(() => {
    if (!hull || hull.length < 1) {
      return 0
    }
    const [cx, cy] = hull[0]
    return hull.reduce(
      (a, [px, py]) => Math.max(a, Math.abs(px - cx) + Math.abs(py - cy)),
      0
    )
  }, [hull])

  const { setCenterZoom, mapState } = props
  const clickHandler = useCallback(() => {
    if (mapState.zoom > 16) {
      setSpiderify(!spiderify)
    } else {
      setCenterZoom(
        [props.geometry.coordinates[1], props.geometry.coordinates[0]],
        Math.min(mapState.zoom + 2, 18)
      )
    }
  }, [setCenterZoom, mapState, spiderify, setSpiderify])

  return (
    <div>
      {SpiderComponent && spiderify && (
        <SpiderComponent {...props} componets={props.component} />
      )}
      {HullComponent && max < 0.05 && hover && (
        <HullComponent {...props} hull={hull} />
      )}
      {MarkerComponent && (
        <MarkerComponent
          {...props}
          anchor={props.geometry.coordinates}
          onClick={clickHandler}
          onMouseOver={(ev) => setHover(true)}
          onMouseOut={(ev) => {
            setHover(false)
          }}
        />
      )}
    </div>
  )
}

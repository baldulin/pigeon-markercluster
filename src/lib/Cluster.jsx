import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react'
import { ClusterMarker } from './ClusterMarker'

export const Cluster = ({ clusters, clusterMarker, ...props }) => {
  const CustomClusterMarker = clusterMarker || ClusterMarker

  return clusters.map((cluster) => {
    const { mapState } = props
    const [a, b] = cluster.geometry.coordinates
    const c = props.latLngToPixel([b, a])

    const p = {
      ...props,
      left: c[0],
      top: c[1]
    }

    if (cluster?.properties?.cluster_id) {
      return (
        <CustomClusterMarker
          key={cluster.properties.cluster_id}
          {...p}
          {...cluster}
        />
      )
    } else {
      return React.cloneElement(cluster.properties.component, p)
    }
  })
}

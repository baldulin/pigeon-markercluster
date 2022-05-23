import React, { useRef, useEffect, useMemo } from 'react'
import { Cluster } from './Cluster'
import Supercluster from 'supercluster'
import { calculateHull } from './utils'

export const useSuperCluster = ({ children, mapState }) => {
  // Create SuperCluster instance
  const clusterCalculator = useMemo(() => {
    const clusterData = React.Children.toArray(children)
      .filter((child) => !!child && React.isValidElement(child))
      .map((child) => ({
        geometry: {
          type: 'Point',
          coordinates:
            child.props.anchor || child.props.position || child.props.center
        },
        properties: {
          component: child
        }
      }))
    return new Supercluster({ minPoints: 2, maxZoom: 20 }).load(clusterData)
  }, [children])

  const { bounds, zoom } = mapState
  const bbox = [bounds.sw[1], bounds.sw[0], bounds.ne[1], bounds.ne[0]]

  const clusters = useMemo(
    () => clusterCalculator.getClusters(bbox, zoom),
    [bbox, zoom, clusterCalculator]
  )

  // SuperCluster does not directly return the clusters with leaves
  const leaveRef = useRef({})
  useEffect(() => {
    leaveRef.current = {}
  }, [clusterCalculator])

  const leavesData = leaveRef.current

  clusters.forEach((cluster) => {
    if (
      cluster?.properties?.cluster_id &&
      !leavesData[cluster.properties.cluster_id]
    ) {
      const leaves = clusterCalculator.getLeaves(
        cluster.properties.cluster_id,
        Infinity
      )
      const leaveComponents = leaves.map((leave) => leave.properties.component)

      leavesData[cluster.properties.cluster_id] = {
        ...cluster,
        component: leaveComponents,
        hull: calculateHull(leaves.map((leave) => leave.geometry.coordinates))
      }
    }
  })
  const leaves = clusters.map(
    (cluster) => leavesData[cluster?.properties?.cluster_id] || cluster
  )

  return leaves
}

export const SuperCluster = ({
  clusterComponent = Cluster,
  children,
  ...props
}) => {
  const CustomCluster = clusterComponent
  const clusters = useSuperCluster({ children, mapState: props.mapState })

  return <CustomCluster clusters={clusters} {...props} />
}

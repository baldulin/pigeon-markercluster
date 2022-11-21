# pigeon-markercluster

> Clustering library for pigeon-maps

## Install

```bash
npm install --save pigeon-markercluster
```

## Usage

```jsx
import { Map, Marker } from 'pigeon-maps'
import { SuperCluster } from 'pigeon-markercluster'

const Example = () => (
  <Map center={[53.7942, 12.17506]} zoom={6} defaultWidth={600} height={800}>
    <SuperCluster>
      {points.map((point) => (
        <Marker anchor={point} />
      ))}
    </SuperCluster>
  </Map>
)
```

## License

MIT © [baldulin](https://github.com/baldulin)

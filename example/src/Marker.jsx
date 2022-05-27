import React, { useState } from 'react'
import { Popup } from './Popup'

export const Marker = (props) => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.left + 6}px`,
        top: `${props.top}px`,
        filter: props.hover ? 'drop-shadow(0 0 4px rgba(0, 0, 0, .3))' : '',
        cursor: 'pointer',
        zIndex: isClicked ? '2' : '1',
        ...(props.style || {})
      }}
      className={
        props.className
          ? `${props.className} pigeon-click-block`
          : 'pigeon-click-block'
      }
      onClick={(ev) => {
        setIsClicked(!isClicked)
        if (!isClicked) {
          const point = props.pixelToLatLng([
            props.left + props.mapState.width / 4 - 25,
            props.top + props.mapState.height / 4 - 41
          ])
          props.setCenterZoom(point)
          //ev.stopPropagation();
        }
      }}
    >
      <span
        className={
          'customPinIcon2 ' + (isClicked ? 'customPinIcon2--clicked' : '')
        }
      />
      {isClicked && (
        <Popup
          closePopup={() => setIsClicked(false)}
          width={props.mapState.width / 2}
          height={props.mapState.height}
        >
          {props.children}
        </Popup>
      )}
    </div>
  )
}

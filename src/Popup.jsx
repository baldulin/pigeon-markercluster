import React, { useEffect } from 'react'

export const Popup = ({ children, closePopup, width, height }) => {
  useEffect(() => {
    const f = (evt) => {
      closePopup()
    }
    window.addEventListener('click', f)
    return () => window.removeEventListener('click', f)
  }, [closePopup])
  return (
    <div
      className='marker-popup'
      style={{ maxWidth: width, maxHeight: height }}
    >
      {children}
    </div>
  )
}

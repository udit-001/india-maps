import React from 'react'
import { useMapEvents } from 'react-leaflet'

function MapEventHandler({ customizerControl }) {
    const map = useMapEvents({
        click: () => {
            customizerControl(false)
        },
        drag: () => {
            customizerControl(false)
        },
        move: () => {
            customizerControl(false)
        },
        mouseup: () => {
            customizerControl(false)
        }
    })
    return null
}

export default MapEventHandler

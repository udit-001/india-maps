import React from 'react'
import { useMapEvents } from 'react-leaflet'
import { useMapContext } from '../../contexts/mapContext'

function MapEventHandler() {
    const { updateCustomizerActive } = useMapContext()

    const map = useMapEvents({
        click: () => {
            updateCustomizerActive(false)
        },
        drag: () => {
            updateCustomizerActive(false)
        },
        move: () => {
            updateCustomizerActive(false)
        },
        mouseup: () => {
            updateCustomizerActive(false)
        }
    })
    return null
}

export default MapEventHandler

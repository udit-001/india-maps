import React from 'react'
import { useMap } from 'react-leaflet'

function FixedBound() {
    const map = useMap();
    const bounds = map.getBounds();
    map.setMaxBounds(bounds);
    map.fitBounds(bounds, { reset: true });
    return
}

export default FixedBound

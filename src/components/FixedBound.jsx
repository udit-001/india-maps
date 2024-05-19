import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function FixedBound() {
    const map = useMap();

    useEffect(() => {
        const bounds = map.getBounds();
        map.setMaxBounds(bounds);
        map.fitBounds(bounds, { reset: true });
    }, [map])
    return null
}

export default FixedBound

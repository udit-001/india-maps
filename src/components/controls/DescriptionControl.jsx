import React from 'react'
import { POSITION_CLASSES } from '../../utils'

function DescriptionControl({ position, title }) {
    const positionClass =
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
        <div className={positionClass}>
            <div className="leaflet-control legend bg-white rounded-sm outline outline-2 outline-gray-400 p-1">
                {title}
            </div>
        </div>
    )
}

export default DescriptionControl

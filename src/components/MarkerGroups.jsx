import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import pythonLogo from '../data/python.png'
import javascriptLogo from '../data/javascript.png'
import fossLogo from '../data/foss.jpg'
import L from 'leaflet'
import { LayersControl, FeatureGroup, Marker, Popup } from 'react-leaflet'

function MarkerItem({ element, index }) {
    useEffect(() => {
        console.log("Adding marker item")
    }, [])

    const pythonIcon = new L.Icon({
        iconUrl: pythonLogo,
        iconSize: [28, 28],
        iconAnchor: [20, 58],
        popupAnchor: [0, -60],
    });


    const fossIcon = new L.Icon({
        iconUrl: fossLogo,
        iconSize: [28, 28],
        popupAnchor: [0, -15],
    });

    const javascriptIcon = new L.Icon({
        iconUrl: javascriptLogo,
        iconSize: [28, 28],
        iconAnchor: [20, 58],
        popupAnchor: [0, -60],
    });

    const icons = {
        "python": pythonIcon,
        "javascript": javascriptIcon,
        "foss": fossIcon
    }



    return (
        <Marker key={index} position={element.coordinates} icon={icons[element['tag']]}>
            <Popup>
                <Link to={element.url} target="_blank" rel="noopener noreferrer">
                    <h1 className='text-sm'>
                        {element.name}
                    </h1>
                </Link>
                <h2 className='text-xs'>
                    ({element.region})
                </h2>
            </Popup>
        </Marker>
    )
}

function MarkerGroup({ group }) {
    useEffect(() => {
        console.log(`Hello ${group[0]['tag']}`)
    }, [])

    return (
        <LayersControl.Overlay name={group[0]['tag']}>
            <FeatureGroup>
                {group.map((element, index) => {
                    return (<MarkerItem element={element} index={index} />)
                })}
            </FeatureGroup>
        </LayersControl.Overlay>
    )
}

function MarkerGroups({ markerData }) {
    useEffect(() => {
        console.log(markerData)
    }, [])

    if (markerData.length !== 0) {
        return (
            <LayersControl position="topright">
                {markerData.map((element) => {
                    return (<MarkerGroup group={element} />)
                })}
            </LayersControl>
        )
    }
    return null
}

export default MarkerGroups

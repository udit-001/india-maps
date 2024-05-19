import React, { useState, useEffect, useRef } from 'react'

import { MapContainer, GeoJSON, ZoomControl } from 'react-leaflet'
import { calculateCenter, generateRedShade, POSITION_CLASSES } from '../utils';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import Loader from './Loader';
import CountryButtonControl from './controls/CountryButtonControl';
import FixedBound from './FixedBound';
import DescriptionControl from './controls/DescriptionControl';
import ImageExportControl from './controls/ImageExportControl';
import MapCustomizer from './controls/MapCustomizer';
import MapCustomizerControl from './controls/MapCustomizerControl';



function StateMap({ id, name }) {
    const [data, setData] = useState(null)
    const [mapCenter, setMapCenter] = useState(null)
    const [editActive, setEditActive] = useState(false)
    const [opacity, setOpacity] = useState(100)
    const [fillColor, setFillColor] = useState("#3498db");
    const [borderColor, setBorderColor] = useState("#000000");
    const [borderWidth, setBorderWidth] = useState(1);
    const [mapStyle, setMapStyle] = useState({
        "weight": 1,
        "color": "black",
        "fillColor": "#3498db",
        "fillOpacity": opacity
    })
    const geojsonRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            var response = await fetch(`https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/geojson/states/${id}.geojson`)
            var data = await response.json()
            setData(data)
            setMapCenter(calculateCenter(data));
        }
        fetchData()
    }, [])

    useEffect(() => {
        setMapStyle({
            "fillOpacity": opacity,
            "fillColor": fillColor,
            "weight": borderWidth,
            "color": borderColor
        })
    }, [
        opacity, fillColor,
        borderColor, borderWidth,
        setFillColor, setOpacity,
        setBorderColor, setBorderWidth
    ])

    const onEachDistricts = (district, layer) => {
        const districtName = district.properties.district;
        layer.bindTooltip(districtName);
        layer.setStyle({className: "hover:brightness-125"})

        layer.on({
            mouseover: (event) => {
                event.target.setStyle({
                    "dashArray": "0 4 0",
                })
            },
            mouseout: (event) => {
                event.target.closeTooltip()
                event.target.setStyle({
                    "dashArray": ""
                })
            },
        })
    }

    return (
        data !== null ? (
            <div className="relative md:aspect-4/3 lg:aspect-video aspect-square overflow-hidden">
                <MapCustomizer
                    active={editActive}
                    updateOpacity={setOpacity}
                    updateFillColor={setFillColor}
                    updateBorderWidth={setBorderWidth}
                    updateBorderColor={setBorderColor}
                />
                <MapContainer
                    className="outline-none md:aspect-4/3 lg:aspect-video aspect-square"
                    zoom={6}
                    attributionControl={false}
                    center={mapCenter}
                    zoomControl={false}
                    zoomDelta={0.3}
                    zoomSnap={0.25}
                    fullscreenControl={{ position: 'bottomright' }}
                    fitBounds={true}
                    maxBoundsViscosity={0.3}
                >
                    <GeoJSON style={mapStyle} data={data} onEachFeature={onEachDistricts} ref={geojsonRef} />
                    <FixedBound />
                    <CountryButtonControl position="topright" />
                    <ZoomControl position='bottomright' />
                    <DescriptionControl position='bottomleft' title="Hover Districts" />
                    <ImageExportControl className="mt-9" position="topleft" fileName={name} />
                    <MapCustomizerControl position='topleft' onPress={(event) => {
                        setEditActive(true)
                    }} />
                </MapContainer></div>) : <Loader />
        )
}




export default StateMap

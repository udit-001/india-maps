import React, { useState, useEffect, useCallback } from 'react'

import { MapContainer, GeoJSON, ZoomControl, useMapEvents } from 'react-leaflet'

import Header from './Header'
import { slugify } from '../utils'
import { useNavigate } from 'react-router-dom'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import Loader from './Loader'
import FixedBound from './FixedBound'
import ImageExportControl from './ImageExportControl'
import DescriptionControl from './DescriptionControl'
import MapCustomizerControl from './MapCustomizerControl'
import MapCustomizer from './MapCustomizer'

function MapEventController({ customizerControl }) {
    const mapEvents = useMapEvents({
        click: () => {
            customizerControl(false)
        }
    })
}


function CountryMap() {
    const [data, setData] = useState({})
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

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            var response = await fetch("https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/geojson/india.geojson")
            var result = await response.json()
            setData(result)
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

    const onEachStates = useCallback((state, layer) => {
        const stateName = state.properties.st_nm;
        layer.bindTooltip(stateName)
        layer.setStyle({ "className": "hover:brightness-125" })

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
            click: (event) => {
                var slug = slugify(event.target.feature.properties.st_nm)
                navigate(`/${slug}`)
            }
        })
    }, [borderWidth, borderColor, opacity, mapStyle])

    if (Object.keys(data).length !== 0) return (
        <>
            <Header title="India" />
            <div className="relative md:aspect-4/3 lg:aspect-video aspect-square overflow-hidden">
                <MapCustomizer
                    active={editActive}
                    updateOpacity={setOpacity}
                    updateFillColor={setFillColor}
                    updateBorderWidth={setBorderWidth}
                    updateBorderColor={setBorderColor}
                />
                <MapContainer
                    className="outline-none h-full"
                    zoom={4}
                    zoomDelta={0.3}
                    zoomSnap={0.25}
                    attributionControl={false}
                    zoomControl={false}
                    center={[22, 80]}
                    fullscreenControl={{ position: 'bottomright' }}
                >
                    <MapEventController customizerControl={setEditActive} />
                    <FixedBound />
                    <GeoJSON style={mapStyle} data={data.features} onEachFeature={onEachStates} />
                    <ZoomControl position='bottomright' />
                    <DescriptionControl position='bottomleft' title="Click/Hover States" />
                    <ImageExportControl className="mt-9" position='topleft' fileName="India" />
                    <MapCustomizerControl position='topleft' onPress={(event) => {
                        setEditActive(true)
                    }} />
                </MapContainer>
            </div>
        </>
    )
    else {
        return (
            <>
                <Header title="India" />
                <Loader />
            </>
        )
    }
}



export default CountryMap

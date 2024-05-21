import React, { useState, useEffect, useCallback } from 'react'

import { MapContainer, GeoJSON, ZoomControl } from 'react-leaflet'

import Header from './Header'
import { slugify } from '../utils'
import { useNavigate } from 'react-router-dom'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import Loader from './Loader'
import FixedBound from './FixedBound'
import ImageExportControl from './controls/ImageExportControl'
import DescriptionControl from './controls/DescriptionControl'
import MapCustomizerControl from './controls/MapCustomizerControl'
import MapCustomizer from './controls/MapCustomizer'
import MapEventHandler from './controls/MapEventHandler'
import MarkerGroups from './MarkerGroups'
import { MapContextProvider } from '../contexts/mapContext'
import { compareObjects } from '../utils'


function CountryMap({ enableCustomizer = false, title = "India", markers = [], featureEffects = true }) {
    const [data, setData] = useState({})
    const [customizerActive, setCustomizerActive] = useState(false)
    const [fillOpacity, setFillOpacity] = useState(100)
    const [fillColor, setFillColor] = useState("#3498db");
    const [borderColor, setBorderColor] = useState("#000000");
    const [borderWidth, setBorderWidth] = useState(1);
    const [mapStyle, setMapStyle] = useState({
        "fillOpacity": fillOpacity / 100,
        "fillColor": "#3498db",
        "weight": 1,
        "color": "#000000"
    })

    const navigate = useNavigate();

    const updateFillColor = (fillColor) => {
        setFillColor(fillColor)
    }

    const updateBorderColor = (borderColor) => {
        setBorderColor(borderColor)
    }

    const updateBorderWidth = (borderWidth) => {
        setBorderWidth(borderWidth)
    }

    const updateFillOpacity = (fillOpacity) => {
        setFillOpacity(fillOpacity)
    }

    const updateCustomizerActive = (value) => {
        setCustomizerActive(value)
    }

    useEffect(() => {
        if (localStorage.getItem("countryMapStyle")) {
            const data = JSON.parse(localStorage.getItem("countryMapStyle"))
            setBorderColor(data.color)
            setBorderWidth(data.weight)
            setFillColor(data.fillColor)
            setFillOpacity(data.fillOpacity * 100)
        }

        const fetchData = async () => {
            var response = await fetch("https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/geojson/india.geojson")
            var result = await response.json()
            setData(result)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setMapStyle((prevStyle) => {
            var newStyle = {
                "fillOpacity": fillOpacity / 100,
                "fillColor": fillColor,
                "weight": borderWidth,
                "color": borderColor
            }

            if(localStorage.getItem("countryMapStyle")){
                const equals = compareObjects(prevStyle, newStyle)
                if(equals === false){
                    localStorage.setItem("countryMapStyle", JSON.stringify(newStyle))
                }
            }
            else{
                localStorage.setItem("countryMapStyle", JSON.stringify(newStyle))
            }

            return newStyle
        })
    }, [
        fillOpacity, fillColor,
        borderColor, borderWidth,
        setFillColor, setFillOpacity,
        setBorderColor, setBorderWidth
    ])

    const onEachStates = useCallback((state, layer) => {
        const stateName = state.properties.st_nm;
        if (featureEffects === true) {
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
        }

    }, [borderWidth, borderColor, fillOpacity])

    if (Object.keys(data).length !== 0) return (
        <>
            <MapContextProvider value={{
                borderColor,
                borderWidth,
                fillColor,
                fillOpacity,
                customizerActive,
                updateBorderColor,
                updateBorderWidth,
                updateFillColor,
                updateFillOpacity,
                updateCustomizerActive
            }}>
                <Header title={title} />
                <div className="relative md:aspect-4/3 lg:aspect-video aspect-square overflow-hidden">
                    {enableCustomizer ? <MapCustomizer /> : ""}

                    <MapContainer
                        className="outline-none h-full"
                        zoom={4}
                        attributionControl={false}
                        center={[22, 80]}
                        zoomControl={false}
                        zoomDelta={0.3}
                        zoomSnap={0.25}
                        fullscreenControl={{ position: 'bottomright' }}
                        fitBounds={true}
                        maxBoundsViscosity={0.3}
                    >
                        <MapEventHandler />
                        <GeoJSON style={mapStyle} data={data.features} onEachFeature={onEachStates} />
                        <FixedBound />
                        {markers ? <MarkerGroups markerData={markers} /> : ""}
                        <ZoomControl position='bottomright' />
                        <DescriptionControl position='bottomleft' title="Click/Hover States" />
                        <ImageExportControl className={enableCustomizer ? "mt-9" : ""} position='topleft' fileName="India" />
                        {enableCustomizer ? <MapCustomizerControl position='topleft' onPress={(event) => {
                            setCustomizerActive(true)
                        }} /> : ""}
                    </MapContainer>
                </div>
            </MapContextProvider>
        </>
    )
    else {
        return (
            <>
                <Header title={title} />
                <Loader />
            </>
        )
    }
}



export default CountryMap

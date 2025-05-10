import React, { useState, useEffect, useRef } from 'react'

import { MapContainer, GeoJSON, ZoomControl } from 'react-leaflet'
import { calculateCenter } from '../utils';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import Loader from './Loader';
import CountryButtonControl from './controls/CountryButtonControl';
import FixedBound from './FixedBound';
import DescriptionControl from './controls/DescriptionControl';
import ImageExportControl from './controls/ImageExportControl';
import MapCustomizer from './controls/MapCustomizer';
import MapCustomizerControl from './controls/MapCustomizerControl';
import MapEventHandler from './controls/MapEventHandler';
import { MapContextProvider } from '../contexts/mapContext'
import { compareObjects } from '../utils';
import { useLocation } from 'react-router';

function StateMap({ id, name }) {
    const [data, setData] = useState(null)
    const [mapCenter, setMapCenter] = useState(null)
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
    const geojsonRef = useRef(null)

    const currentRoute = useLocation().pathname.replace("/", "")

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
        if (localStorage.getItem(currentRoute)) {
            const data = JSON.parse(localStorage.getItem(currentRoute))
            setBorderColor(data.color)
            setBorderWidth(data.weight)
            setFillColor(data.fillColor)
            setFillOpacity(data.fillOpacity * 100)
        }

        const fetchData = async () => {
            var response = await fetch(`https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/geojson/states/${id}.geojson`)
            var data = await response.json()
            setData(data)
            setMapCenter(calculateCenter(data));
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

            if (localStorage.getItem(currentRoute)) {
                const equals = compareObjects(prevStyle, newStyle)
                if (equals === false) {
                    localStorage.setItem(currentRoute, JSON.stringify(newStyle))
                }
            }
            else {
                localStorage.setItem(currentRoute, JSON.stringify(newStyle))
            }

            return newStyle
        })
    }, [
        fillOpacity, fillColor,
        borderColor, borderWidth,
        setFillColor, setFillOpacity,
        setBorderColor, setBorderWidth
    ])

    const onEachDistricts = (district, layer) => {
        const districtName = district.properties.district;
        layer.bindTooltip(districtName);
        layer.setStyle({ className: "hover:brightness-125" })

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

    const downloadGeoJSON = () => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name.toLowerCase()}.geojson`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadTopoJSON = async () => {
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/topojson/states/${id}.json`);
            const topoData = await response.json();
            const blob = new Blob([JSON.stringify(topoData)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${name.toLowerCase()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading TopoJSON:', error);
        }
    };

    return (
        data !== null ? (
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative aspect-square md:aspect-4/3 lg:aspect-video overflow-hidden flex-1 min-h-[380px] w-full">
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
                        <MapCustomizer />
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
                            <MapEventHandler />
                            <GeoJSON style={mapStyle} data={data.features} onEachFeature={onEachDistricts} ref={geojsonRef} />
                            <FixedBound />
                            <CountryButtonControl position="topright" />
                            <ZoomControl position='bottomright' />
                            <DescriptionControl position='bottomleft' title="Hover Districts" />
                            <ImageExportControl className="mt-9" position="topleft" fileName={name} />
                            <MapCustomizerControl position='topleft' onPress={() => {
                                setCustomizerActive(true)
                            }} />
                        </MapContainer>
                    </MapContextProvider>
                </div>

                {/* Download Panel - moved to aside */}
                <div className="bg-white rounded-md shadow-lg p-4 w-full md:w-64 h-fit">
                    <h3 className="font-semibold text-gray-800 mb-3">Download Map Data</h3>
                    <div className="space-y-2">
                        <button
                            onClick={downloadGeoJSON}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                        >
                            Download GeoJSON
                        </button>
                        <button
                            onClick={downloadTopoJSON}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                        >
                            Download TopoJSON
                        </button>
                    </div>
                </div>
            </div>
        ) : <Loader />
    )
}

export default StateMap

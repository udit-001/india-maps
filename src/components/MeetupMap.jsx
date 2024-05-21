import React, { useEffect, useState } from 'react'
import CountryMap from './CountryMap'
import * as turf from "@turf/turf"

function MeetupMap() {
    const [markerData, setMarkerData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            var indiaMapResponse = await fetch("https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/geojson/india.geojson")
            var indiaMapData = await indiaMapResponse.json()

            var meetupResponse = await fetch("/data/meetups.json")
            var meetupData = await meetupResponse.json()

            var markers = []
            var found = new Set();
            var item, key, obj;

            if (Object.keys(indiaMapData).length !== 0) {
                for (let i = 0; i < meetupData.length; i++) {
                    for (let j = 0; j < indiaMapData.features.length; j++) {
                        item = indiaMapData.features[j]
                        if ('district' in item['properties']) {
                            key = item['properties']['district'].toLowerCase()
                        }
                        else {
                            key = item['properties']['st_nm'].toLowerCase()
                        }
                        if (key.includes(meetupData[i]['region'].toLowerCase())) {
                            if (!found.has(meetupData[i]['name'])) {
                                obj = {
                                    ...meetupData[i],
                                    'coordinates': turf.center(item).geometry.coordinates.reverse()
                                }
                                markers.push(obj)
                                found.add(meetupData[i]['name'])
                            }
                        }
                    }
                }
            }

            var groups = new Set()
            for (let i = 0; i < markers.length; i++) {
                groups.add(markers[i]['tag'])
            }

            let output = {}
            groups.forEach((group) => {
                output[group] = []
            })

            markers.forEach((meetup) => {
                output[meetup['tag']].push(meetup)
            })

            setMarkerData(Object.values(output))

        }
        fetchData()
    }, [])

    return (
        <CountryMap title="India Meetups" markers={markerData} featureEffects={false} />
    )
}

export default MeetupMap

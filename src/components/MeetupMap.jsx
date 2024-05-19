import React, { useEffect, useState } from 'react'
import CountryMap from './CountryMap'
import * as turf from "@turf/turf"

function MeetupMap() {
    const [data, setData] = useState({})
    const [meetupCoords, setMeetupCoords] = useState([])
    const [meetupData, setMeetupData] = useState({})
    const [markerData, setMarkerData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            var response = await fetch("https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/geojson/india.geojson")
            var result = await response.json()
            setData(result)
        }
        fetchData()
        const fetchMeetups = async () => {
            var response = await fetch("/data/meetups.json")
            var result = await response.json()
            setMeetupData(result)
        }
        fetchMeetups()
    }, [])

    useEffect(() => {
        var markers = []
        var found = new Set();
        var item, key, obj;
        if (Object.keys(data).length !== 0) {
            for (let i = 0; i < meetupData.length; i++) {
                for (let j = 0; j < data.features.length; j++) {
                    item = data.features[j]
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
        setMeetupCoords(markers)
    }, [meetupData, setMeetupData])

    useEffect(() => {
        var groups = new Set()
        for (let i = 0; i < meetupCoords.length; i++) {
            groups.add(meetupCoords[i]['tag'])
        }

        let output = {}
        groups.forEach((group) => {
            output[group] = []
        })

        meetupCoords.forEach((meetup) => {
            output[meetup['tag']].push(meetup)
        })
        var markerValues = Object.values(output)
        setMarkerData(markerValues)
    }, [meetupCoords, setMeetupCoords])

    useEffect(() => {
        console.log(markerData)
    }, [markerData])

    return (
        <CountryMap title="India Meetups" markers={markerData} featureEffects={false} />
    )
}

export default MeetupMap

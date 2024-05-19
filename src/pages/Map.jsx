import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Header from '../components/Header'
import { toTitleCase } from '../utils'
import StateMap from '../components/StateMap'

function Map() {
  const [title, setTitle] = useState("hello")
  const { id } = useParams()

  useEffect(() => {
    setTitle(toTitleCase(id.replaceAll("-", " ")))
  }, [])

  return (
    <>
        <Header title={title}/>
        <StateMap id={id} name={title}/>
    </>
  )
}

export default Map

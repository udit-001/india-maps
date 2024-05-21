import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Header from '../components/Header'
import { toTitleCase } from '../utils'
import StateMap from '../components/StateMap'

function Map() {
  const [title, setTitle] = useState("hello")
  const { id } = useParams()

  useEffect(() => {
    const stateName = toTitleCase(id.replaceAll("-", " "));
    setTitle(stateName)
    document.title = `${stateName} Map`;
  }, [])

  return (
    <>
      <Header title={title} />
      <StateMap id={id} name={title} />
    </>
  )
}

export default Map

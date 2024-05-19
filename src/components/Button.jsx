import React from 'react'
import { Link } from 'react-router-dom'

function Button({path, text}) {
  return (
    <Link to={path} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {text}
    </Link>
  )
}

export default Button

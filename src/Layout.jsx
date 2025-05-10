import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { FiHome, FiMap } from 'react-icons/fi'
import PropTypes from 'prop-types'

function Layout() {
  const location = useLocation()
  const [states, setStates] = useState([])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@latest/state-list.json')
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error('Error fetching states:', error))
  }, [])

  return (
    <div className="w-full">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-3">
            <Link to="/" className="text-xl font-bold flex items-center">
              <FiMap className="mr-2" />
              India Maps
            </Link>
            <div className="flex space-x-2">
              <NavLink to="/" icon={<FiHome />} text="Home" active={location.pathname === '/'} />
              <NavLink to="/map" icon={<FiMap />} text="Country Map" active={location.pathname === '/map'} />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow bg-gray-50">
        <div className="container-2xl mx-auto px-4 py-6">
          <Outlet key={location.pathname} />
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-semibold mb-2">Explore States</h3>
          <div className="flex flex-wrap gap-2">
            {states.map((state) => (
              <Link
                key={state.name}
                to={`/${state.slug}`}
                className="px-3 py-1 rounded-md hover:bg-blue-500 transition-colors"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, icon, text, active }) {
  return (
    <Link 
      to={to}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        active ? 'bg-blue-500' : 'hover:bg-blue-500'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </Link>
  )
}

export default Layout
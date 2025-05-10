import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { FiHome, FiMap, FiMenu, FiX } from 'react-icons/fi'

function Layout() {
  const location = useLocation()
  const [states, setStates] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

            <button
              className="md:hidden p-2 rounded-md hover:bg-blue-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="hidden md:flex space-x-2">
              <NavLink to="/" icon={<FiHome />} text="Home" active={location.pathname === '/'} />
              <NavLink to="/map" icon={<FiMap />} text="Country Map" active={location.pathname === '/map'} />
              <a href="https://github.com/udit-001/india-maps" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 rounded-md hover:bg-blue-500 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 rounded-md p-4">
              <div className="flex flex-col space-y-2">
                <NavLink to="/" icon={<FiHome />} text="Home" active={location.pathname === '/'} />
                <NavLink to="/map" icon={<FiMap />} text="Country Map" active={location.pathname === '/map'} />
                <a href="https://github.com/udit-001/india-maps" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 rounded-md hover:bg-blue-500 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow bg-gray-50">
        <div className="container-2xl mx-auto px-4 py-6 bg-gradient-to-b from-blue-50 to-white">
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
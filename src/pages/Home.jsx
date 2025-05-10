import React from 'react'
import Button from '../components/Button'

function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center py-20">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Explore India&apos;s Geography
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Interactive maps of India with detailed state and district information.
            Customize, explore, and download maps for your needs.
          </p>
          <Button path="/map" text="View India Map" />
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Interactive Maps</h3>
              <p className="text-gray-600">
                Click and hover over states and districts to see detailed information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Customization</h3>
              <p className="text-gray-600">
                Change colors, borders, and opacity to create your perfect map.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Download Options</h3>
              <p className="text-gray-600">
                Export maps in multiple formats including PNG, JPG, SVG, GeoJSON, and TopoJSON.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

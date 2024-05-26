import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import CountryMap from './components/CountryMap.jsx'
import Map from './pages/Map.jsx'
import Home from './pages/Home.jsx'
import MeetupMap from './components/MeetupMap.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* <Route path="" element={<Home />} /> */}
      <Route path="" element={<CountryMap enableCustomizer={true} />} />
      <Route path="meetups" element={<MeetupMap />} />
      <Route path=":id" element={<Map />} />
    </Route>
  ))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

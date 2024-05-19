import React from 'react'
import { Outlet, useParams } from 'react-router'
import Header from './components/Header'

function Layout() {
    const { pageId } = useParams()
    return (
        <div className="w-full flex justify-center">
            <div className='md:w-11/12 lg:w-3/4 w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout

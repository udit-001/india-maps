import React from 'react'

function Loader() {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div style={{ background: "#ddd" }} className='outline-none rounded aspect-square md:aspect-4/3 lg:aspect-video  animate-pulse w-full min-h-[380px] '>
            </div>
            <div style={{ background: "#ddd" }} className='rounded-md shadow-lg p-4 w-full md:w-64 h-64'>
            </div>
        </div>
    )
}

export default Loader

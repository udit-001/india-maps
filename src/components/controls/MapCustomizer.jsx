import React, { useRef, useEffect, useState } from 'react'

function ColorTemplate({ fillColor, borderColor, onClick }) {
    return (
        <div data-fillcolor={fillColor} data-bordercolor={borderColor} className='cursor-pointer w-8 h-8 hover:border hover:border-white' style={{ backgroundImage: `linear-gradient(135deg, ${fillColor} 75%, ${borderColor} 25%)` }} onClick={(event) => { onClick(event) }}></div>
    )
}

function MapCustomizer({ updateFillColor, updateBorderWidth, updateOpacity, updateBorderColor, active = false }) {
    const [isActive, setIsActive] = useState(active)
    const [fillColor, setFillColor] = useState("#3498db");
    const [borderColor, setBorderColor] = useState("#000000");
    const [opacity, setOpacity] = useState(100);
    const [borderWidth, setBorderWidth] = useState(1);
    const [activeClass, setActiveClass] = useState("opacity-0 invisible");

    const containerRef = useRef()

    useEffect(() => {
        containerRef.current.classList.add("invisible")
        containerRef.current.classList.add("-translate-x-full")
        setTimeout(() => {
            containerRef.current.classList.remove("invisible")
        }, 400)
    }, [])

    useEffect(() => {
        if(isActive === true){
            setActiveClass("-translate-x-full")
            containerRef.current.classList.remove("invisible")
            setActiveClass("translate-x-0")
        }   
        if(!containerRef.current.classList.contains("invisible") && isActive === false) {
            setActiveClass("-translate-x-full")
        }
    }, [isActive, setIsActive])

    useEffect(() => {
        if(active === true && containerRef.current.classList.contains("invisible")){
            containerRef.current.classList.remove("invisible")
        }
        if(active === false){
            containerRef.current.classList.add("-translate-x-full")
        }
        setIsActive(active)
    }, [active])

    useEffect(() => {
        updateFillColor(fillColor)
    }, [fillColor, setFillColor])

    useEffect(() => {
        updateBorderColor(borderColor)
    }, [borderColor, setBorderColor])

    useEffect(() => {
        updateBorderWidth(borderWidth)
    }, [borderWidth, setBorderWidth])

    useEffect(() => {
        updateOpacity(opacity / 100)
    }, [opacity, setOpacity])

    const colorTemplates = [
        {
            fillColor: "#3498DB",
            borderColor: "#000000"
        },
        {
            fillColor: "#a6bddb",
            borderColor: "#2b8cbe"
        },
        {
            fillColor: "#a1d99b",
            borderColor: "#31a354"
        },
        {
            fillColor: "#bcbddc",
            borderColor: "#756bb1"
        },
        {
            fillColor: "#fc9272",
            borderColor: "#de2d26"
        },
        {
            fillColor: "#fa9fb5",
            borderColor: "#c51b8a"
        }
    ]

    return (
        <div ref={containerRef} className={`absolute transition-transform ease-in-out duration-300 ${activeClass} w-3/4 sm:w-7/12 opacity-90 bg-neutral-900 h-full`} style={{ zIndex: 9999 }}>
            <h2 className='m-5 text-left font-bold text-slate-200'>
                Map Customization
            </h2>
            <div className='hover:bg-neutral-800 pl-4 px-4 pb-5 pt-px'>
                <h2 className='text-xs font-semibold text-slate-300 text-left mt-4'>Fill —</h2>
                <div className='grid grid-flow-col gap-x-14 text-slate-300 text-xs'>
                    <div className='grid justify-items-start gap-2'>
                        <h1>Color ({fillColor})</h1>
                        <input className='border border-white border-solid' type="color" value={fillColor} onChange={(event) => setFillColor(event.target.value)} />
                    </div>
                    <div className='grid justify-items-start gap-2'>
                        <h1>Opacity <span className='font-semibold'>({opacity}%)</span></h1>
                        <input type="range" min={0} max={100} step={1} value={opacity} onChange={(event) => { setOpacity(event.target.value) }} className='w-24' />
                    </div>
                </div>
            </div>
            <div className='hover:bg-neutral-800 pl-4 px-4 pb-5 pt-px'>
                <h2 className='text-xs font-semibold text-slate-300 text-left mt-4'>Border —</h2>
                <div className='grid grid-flow-col gap-x-14 text-slate-300 text-xs'>
                    <div className='grid justify-items-start gap-2'>
                        <h1>Color ({borderColor})</h1>
                        <input className='border border-white border-solid' type="color" value={borderColor} onChange={(event) => setBorderColor(event.target.value)} />
                    </div>
                    <div className='grid justify-items-start gap-2'>
                        <h1>Width <span className='font-semibold'>({borderWidth}px)</span></h1>
                        <input type="range" className='appearance-auto w-24' min={0} max={10} step={0.1} onChange={(event) => { setBorderWidth(event.target.value) }} value={borderWidth} />
                    </div>
                </div>
            </div>
            <div className='hover:bg-neutral-800 px-4 pb-4 pr-16 text-left pt-3'>
                <h2 className='text-xs font-semibold text-slate-300'>Premade Templates —</h2>
                <h1 className='text-xs text-slate-300'>Or use these templates instead</h1>
                <div className="flex flex-row space-x-1.5 mt-3">
                    {
                        colorTemplates.map(function (template, index) {
                            return (
                                <ColorTemplate
                                    key={index}
                                    fillColor={template.fillColor}
                                    borderColor={template.borderColor}
                                    onClick={(event) => {
                                        setFillColor(event.target.dataset.fillcolor)
                                        setBorderColor(event.target.dataset.bordercolor)
                                    }} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex m-4'>
                <button className='justify-left bg-gray-600 hover:bg-gray-500 text-xs text-white uppercase focus:border focus:border-slate-400 rounded py-2 px-3' onClick={() => {
                    setIsActive(false)
                }}>
                    Save & Close
                </button>
            </div>
        </div>
    )
}

export default MapCustomizer

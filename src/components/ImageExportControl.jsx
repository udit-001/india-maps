import React, { useState } from 'react'
import { useMap } from 'react-leaflet'
import { POSITION_CLASSES } from '../utils'
import { saveAs } from "file-saver";
import { toPng, toJpeg, toSvg } from 'html-to-image';


function DownloadButtons({ active, map, fileName}) {
    const filter = (node) => {
        return !node.classList.contains("leaflet-control")
    }

    const downloadFile = (format) => {
        map._container.classList.add("bg-transparent")
        
        if (format === "svg") {
            toSvg(map._container, { filter: filter }).then((dataUrl) => {
                saveAs(dataUrl, fileName + ".svg");
            }).then(() => {
                map._container.classList.remove("bg-transparent")
            })
        }
        else if (format === "png") {
            toPng(map._container, { filter: filter }).then((dataUrl) => {
                saveAs(dataUrl, fileName + ".png");
            }).then(() => {
                map._container.classList.remove("bg-transparent")
            })
        }
        else if (format === "jpg") {
            toJpeg(map._container, { filter: filter }).then((dataUrl) => {
                saveAs(dataUrl, fileName + ".jpeg");
            }).then(() => {
                map._container.classList.remove("bg-transparent")
            })
        }
    }

    const downloadSVG = () => {
        downloadFile("svg")
    }

    const downloadPNG = () => {
        downloadFile("png")
    }

    const downloadJPG = () => {
        downloadFile("jpg")
    }

    if (active === true) {
        return (
            <>
                <button className="hover:bg-gray-100 text-sm p-1 outline-none focus:shadow-outline" onClick={downloadSVG}>
                    SVG
                </button>
                <button className="hover:bg-gray-100 p-1 outline-none text-sm focus:shadow-outline" onClick={downloadPNG}>
                    PNG
                </button>
                <button className="hover:bg-gray-100 p-1 text-sm outline-none rounded-r-sm focus:shadow-outline" onClick={downloadJPG}>
                    JPG
                </button>
            </>
        )
    }
    return
}

function ImageExportControl({ className, position, fileName = "mymap" }) {
    const positionClass =
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    const map = useMap()
    const [hovered, setHovered] = useState(false)

    return (
        <div className={`${className} ${positionClass}`}>
            <div className="leaflet-control legend cursor-pointer bg-white rounded-sm outline outline-2 outline-gray-400" onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} title="Download Map">
                <div className="flex justify-center rounded-lg text-lg" role="group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-7 hover:bg-gray-100 px-1">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    <DownloadButtons active={hovered} map={map} fileName={fileName}/>
                </div>
            </div>
        </div>
    )
}

export default ImageExportControl

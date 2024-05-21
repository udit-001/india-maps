import { createContext, useContext } from "react";

export const mapContext = createContext({
    fillColor: "#3498db",
    borderColor: "#000000",
    fillOpacity: 1,
    borderWidth: 1,
    customizerActive: false,
    updateFillColor: () => {},
    updateBorderColor: ()  => {},
    updateFillOpacity: () => {},
    updateBorderWidth: () => {},
    updateCustomizerActive: () => {}
})

export const useMapContext = () => {
    return useContext(mapContext)
}

export const MapContextProvider = mapContext.Provider

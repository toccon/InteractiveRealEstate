import React, { useState, createContext, useContext } from 'react'

const MapContext = createContext(); 
const MapUpdateContext = createContext(); 

export function useMap(){
    return useContext(MapContext);
}

export function useMapUpdate(){
    return useContext(MapUpdateContext);
}

export const MapProvider = ({ children }) => {
    const [worldMap, setWorldMap] = useState(null); 

    function setWorldSeries(worldSeries){
        setWorldMap(worldSeries);
    }

    return(
        <MapContext.Provider value={worldMap}>
            <MapUpdateContext.Provider value={setWorldSeries}>
                {children}
            </MapUpdateContext.Provider>
        </MapContext.Provider>
    )
}
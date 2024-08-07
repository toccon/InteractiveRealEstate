import React, { useState, createContext, useContext } from 'react'

// Can access the root, worldSeries, countrySeries, expandButoon, backButton and more from the chart
// Example usage from a component within the context: 
// const chart = useChart();
// To access root:              chart._root
// To access world series:      chart.series._values[0]
// To access country series:    chart.series._values[1]
// To access back container:    chart.children._values[2]

const ChartContext = createContext(); 
const ChartUpdateContext = createContext(); 

export function useChart(){
    return useContext(ChartContext);
}

export function useChartUpdate(){
    return useContext(ChartUpdateContext);
}

export const MapProvider = ({ children }) => {
    const [chart, setChart] = useState(null); 

    function setRootChart(chart){
        setChart(chart);
    }

    return(
        <ChartContext.Provider value={chart}>
            <ChartUpdateContext.Provider value={setRootChart}>
                {children}
            </ChartUpdateContext.Provider>
        </ChartContext.Provider>
    )
}
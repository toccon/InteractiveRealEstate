import { useSelector } from 'react-redux';
import './App.css';
import DrillDownMap from './map/DrillDownMap';
import { SidePanel } from './sidePanel/SidePanel';
import { MapProvider } from './map/MapContext'

function App() {

  const isSidePanelOpen = useSelector(state => state.sidePanel.open);

  return (
    <div className="App">
      <MapProvider>
        <DrillDownMap/>
        {isSidePanelOpen && <SidePanel/>}
      </MapProvider>
    </div>
  );
}

export default App;
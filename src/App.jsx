import { useSelector } from 'react-redux';
import './App.css';
import DrillDownMap from './DrillDownMap';
import { SidePanel } from './SidePanel';
import { MapProvider } from './MapContext'

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
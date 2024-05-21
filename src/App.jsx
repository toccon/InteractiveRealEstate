import { useSelector } from 'react-redux';
import './App.css';
import DrillDownMap from './DrillDownMap';
import { SidePanel } from './SidePanel';

function App() {

  const isSidePanelOpen = useSelector(state => state.sidePanel.open);

  return (
    <div className="App">
      <DrillDownMap/>
      {isSidePanelOpen && <SidePanel/>}
    </div>
  );
}

export default App;
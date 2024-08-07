import { useSelector } from 'react-redux';
import './App.css';
import { Layout } from 'antd';
import DrillDownMap from './map/DrillDownMap';
import { MapProvider } from './map/MapContext';
import { SidePanel } from './sidePanel/SidePanel';
import { FixedHeader } from './header/FixedHeader';
import { FixedFooter } from './footer/FixedFooter';

function App() {

  const isSidePanelOpen = useSelector(state => state.sidePanel.open);

  return (
    <Layout>
      <FixedHeader/>
      <MapProvider>
        <DrillDownMap/>
        {isSidePanelOpen && <SidePanel/>}
      </MapProvider>
      <FixedFooter/>
    </Layout>
  );
}

export default App;
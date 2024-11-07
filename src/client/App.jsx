import { useSelector } from 'react-redux';
import './App.css';
import { Layout } from 'antd';
import DrillDownMap from './map/DrillDownMap';
import { MapProvider } from './map/MapContext';
import { SidePanel } from './sidePanel/SidePanel';
import { FixedHeader } from './header/FixedHeader';
import { FixedFooter } from './footer/FixedFooter';

function App() {

  const isSidePanelOpen = useSelector(state => state.sidePanel.open)
  const selectedTab = useSelector(state => state.selectedTab.tabName)

  const displayContent = () => {
    switch (selectedTab) {
      case 'explore':
        return (
          <MapProvider>
            <DrillDownMap />
            {isSidePanelOpen && <SidePanel />}
          </MapProvider>
        );
      case 'home':
        return (
          <div>
            <h1>home page</h1>
          </div>
        );
      default:
        return (
          <div>
            <h1>no page matched</h1>
          </div>
        ); 
    }
  }

  return (
    <Layout>
      <FixedHeader/>
        {displayContent()}
      <FixedFooter/>
    </Layout>
  );
}

export default App;
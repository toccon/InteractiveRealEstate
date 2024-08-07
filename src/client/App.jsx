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

  const displayContent = () =>{
    if(selectedTab === 'explore'){
      return(
        <MapProvider>
          <DrillDownMap/>
          {isSidePanelOpen && <SidePanel/>}
        </MapProvider>
      )
    } else if(selectedTab === 'home'){
      return(
        <div>
          <h1>home page</h1>
        </div>
      )
    } else if(selectedTab === 'contact'){
      return(
        <div>
          <h1>contact page</h1>
        </div>
      )
    } else if(selectedTab === 'pricing'){
      return(
        <div>
          <h1>pricing page</h1>
        </div>
      )
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
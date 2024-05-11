import { useSelector } from 'react-redux';
import './App.css';
import DrillDownMap from './DrillDownMap';
import { SidePanel } from './SidePanel';

function App() {

  const selectedCountry = useSelector(state => state.selectedCountry.value);

  return (
    <div className="App">
      <DrillDownMap/>
      {selectedCountry && <SidePanel/>}
    </div>
  );
}

export default App;
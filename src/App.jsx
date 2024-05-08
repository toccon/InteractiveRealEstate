import './App.css';
import DrillDownMap from './DrillDownMap';
import { SidePanel } from './SidePanel';
import { useState } from 'react';

function App() {

  const [selectedCountry, setSelectedCountry] = useState(null); 

  return (
    <div className="App">
      <DrillDownMap setSelectedCountry={setSelectedCountry}/>
      {selectedCountry && <SidePanel selectedCountry={selectedCountry}/>}
    </div>
  );
}

export default App;
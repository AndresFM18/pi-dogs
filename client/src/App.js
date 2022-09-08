import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from '../src/components/Landing/Landing.jsx';
import CrearRaza from '../src/components/CrearRaza/CrearRaza.jsx'

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/create' element={<CrearRaza/>}></Route>
    </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {Route, Routes} from 'react-router-dom';
import Landing from '../src/components/Landing/Landing.jsx';
import CrearRaza from '../src/components/CrearRaza/CrearRaza.jsx'
import Principal from '../src/components/Principal/Principal.jsx'
import DogDetail from '../src/components/DogDetail/DogDetail.jsx'

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/create' element={<CrearRaza/>}></Route>
      <Route path='/home/:id' element={<Principal/>}/>
      <Route path='/dogs/:id' element={<DogDetail/>}></Route>
    </Routes>
    </div>
  );
}

export default App;

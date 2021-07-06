
import './App.css';
import Home from './components/Home';
import { Routes,Route } from 'react-router-dom';
import ParticularDiet from './components/ParticularDiet';
import AllDiet from './components/AllDiet';
import UpdatePlan from './components/UpdatePlan';
import Navigation from './components/Navigation';
function App() {
  return (
    <div className="App">

    <Navigation/>
     
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/alldiets" element={<AllDiet/>} />
        <Route path="/diet/:id" element={<ParticularDiet/>} />
        <Route path="/update/:id" element={<UpdatePlan/>} />
      </Routes>
      
    </div>
  );
}

export default App;

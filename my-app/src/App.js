
import './App.css';
import Home from './components/Home';
import { Routes,Route,Link } from 'react-router-dom';
import ParticularDiet from './components/ParticularDiet';
import AllDiet from './components/AllDiet';
import UpdatePlan from './components/UpdatePlan';
function App() {
  return (
    <div className="App">
    <h1 className="heading"> <Link style={{textDecoration:"none",color:"black"}} to="/">Diet Plan</Link> </h1>
     
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/alldiets" element={<AllDiet/>} />
        <Route path="/diet/:id" element={<ParticularDiet/>} />
        <Route path="/update" element={<UpdatePlan/>} />
      </Routes>
      
    </div>
  );
}

export default App;

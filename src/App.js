import Navbar from './components/navbar/navbar';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
 
    <div className="App">
    <Navbar />
    </div>
    
    </BrowserRouter>
  
  );
}

export default App;

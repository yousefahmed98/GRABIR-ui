import Navbar from './components/navbar/navbar';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/home/home'
import Test from './pages/Test';
import "./components/fonts.css"
import Register from './pages/register/register';


function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path={"/"} exact component={Navbar} />
    <Route path={"/login"} exact component={Login} />
    <Route path={"/register"} exact component={Register} />
    <Route path={"/test"} exact component={Test} />
    <Route path={"/home"} exact component={Home} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;

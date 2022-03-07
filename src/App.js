import Navbar from './components/navbar/navbar';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/home'
import PostDetails from './pages/postDetails/PostDetails'
import Test from './pages/Test';
import "./components/fonts.css"
import Register from './pages/register/register';
import LandingPage from './components/landing_page/LandingPage';
import NotFound from './pages/NotFound/NotFound';


function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path={"/"} exact component={Navbar} />
    <Route path={"/login"} exact component={Login} />
    <Route path={"/register"} exact component={Register} />
    <Route path={"/test"} exact component={Test} />
    <Route path={"/home"} exact component={Home} />
    <Route path={"/PostDetails/:id"} exact component={PostDetails} />

    <Route path={"/landing"} exact component={LandingPage} />
    <Route path="*" exact component={NotFound} />

    </Switch>
    </BrowserRouter>
  );
}

export default App;

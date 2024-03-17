//import logo from './logo.svg';
import './App.css';
import RegistrationForm from './Components/RegistrationForm';
import {Link,Routes,Route} from 'react-router-dom';
import RouteComp from './Components/RouteComp';
import { useSelector } from 'react-redux';
import LoginComp from './Components/LoginComp';
import LogoutComp from './Components/LoginComp';
import HomeComp from './Components/HomeComp';


function App() {
  const mystate = useSelector(state=> state.logged)
  return (
    <div className="App" >
      <header>
      <link href="bootstrap.min.css" rel="stylesheet" />
      <script src="bootstrap.bundle.min.js" ></script>
      <div style={{display: mystate.loggedIn?"none":"block"}}>
        <h1><b>Home and Hotel Management System</b></h1>
            <ul className="nav navbar">
            <li className="nav-item">
                <Link to="/RegistrationForm" className="nav-link">REGISTER</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
            </li>
      </ul>
      </div>
        
         

      <Routes>
        <Route path="/" element={<RouteComp />}/>
          <Route path="/RegistrationForm" element={ <RegistrationForm/> } />
          <Route path="/login" element={<LoginComp />}  />
          <Route path="/home" element={ <HomeComp/> } >
          <Route path="logout" element={ <LogoutComp /> } />
        </Route>
      </Routes>
      
      </header>
    </div>
  );
}

export default App;

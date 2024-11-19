import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/LogSign/Login';
import Signup from './components/LogSign/Signup';
import UserInterface from './components/LogSign/UserInterface'
import Oldlogin from './components/Oldlogin';
import Logincar from './components/LogSign/Logincar';
import PrivateRoute from './components/LogSign/PrivateRoute';

function App() {
  return (
<>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={'Home'}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route element={<PrivateRoute />}>
            <Route path="/userinterface" element={<UserInterface />} />
          </Route>
          <Route path='/oldlogin' element={<Oldlogin />}/>
          <Route path='/logincar' element={<Logincar />}/>
          <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
</>
  );
}

export default App;

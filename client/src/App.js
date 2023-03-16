import {Route,Routes} from 'react-router-dom'
import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer'
import './App.css';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import SignIn from './components/SignIn';
import AddProduct from './components/AddProduct';
import GetProduct from './components/GetProduct';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path='/' element={ <GetProduct/> }/>
        <Route path='/add' element={ <AddProduct/>}/>
        <Route path='/update/:id' element={ <UpdateProduct/> }/>
        <Route path='/logout' element={ <h1>Logout</h1> }/>
        <Route path='/profile' element={ <h1>Profile</h1> }/>
        </Route>

        <Route path='/signup' element={ <SignUp/> }/>
        <Route path='/signin' element={ <SignIn/> }/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';

/** Styles */
import 'react-toastify/dist/ReactToastify.css';

/** Components */
import { ToastContainer } from 'react-toastify';

/** Custom components */
import Loader from './Loader';
import Login from '../../components/login/Login';
import Home from '../../components/home/Home';

const  App = () => { 
  //TODO: Add loader

  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' autoClose={1500} hideProgressBar /> 
        <Routes>
            <Route path="/" element={ <Login /> }/>
            <Route path="/login" element={ <Home /> } />   
        </Routes> 
    </>
  );
}

export default App;

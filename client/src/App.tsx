import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import SignUpPage from './pages/Auth/SignUp/SignUpPage';

import './assets/style/general.css'
import 'react-toastify/dist/ReactToastify.min.css'; 

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;

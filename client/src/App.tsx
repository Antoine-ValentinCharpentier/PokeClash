import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { AuthContextProvider } from './contexts/AuthContext'

import PrivatePage from './pages/Auth/PrivatePage';
import PublicPage from './pages/Auth/PublicPage';

import SignUpPage from './pages/Auth/SignUp/SignUpPage';
import SignInPage from './pages/Auth/SignIn/SignInPage';
import HomePage from './pages/MenuScreen/Home/HomePage';

import './assets/style/general.css'
import 'react-toastify/dist/ReactToastify.min.css'; 

function App() {

  const routes = <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivatePage><HomePage/></PrivatePage>} />
          <Route path="/signin" element={<PublicPage><SignInPage/></PublicPage>} />
          <Route path="/signup" element={<PublicPage><SignUpPage/></PublicPage>} />
        </Routes>
      </Router>
  </>

  return (
    <>
      <AuthContextProvider>
        {routes}
      </AuthContextProvider>
      <ToastContainer />
    </>
  )
}

export default App;

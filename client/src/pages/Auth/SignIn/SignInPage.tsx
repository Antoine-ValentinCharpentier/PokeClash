import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import AuthContext from '../../../contexts/AuthContext';

import SplitPage from '../../../components/Layout/AuthLayout';
import SignInForm from './components/SignInForm'

import '../../../assets/style/components/ui/Pokeball/Pokeball.css'

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { tokens } = useContext(AuthContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (tokens.accessToken) {
      navigate('/');
    }
  }, [tokens, navigate]);

  return (
    <SplitPage form={<SignInForm/>}/>
  );
};

export default SignInPage;
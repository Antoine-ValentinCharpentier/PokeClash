import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import AuthContext from '../../../contexts/AuthContext';

import SplitPage from '../../../components/Layout/AuthLayout';
import SignUpForm from './components/SignUpForm'

import '../../../assets/style/components/ui/Pokeball/Pokeball.css'

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const { tokens } = useContext(AuthContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (tokens.accessToken) {
      navigate('/');
    }
  }, [tokens, navigate]);

  return (
    <SplitPage form={<SignUpForm/>}/>
  );
};

export default SignUpPage;
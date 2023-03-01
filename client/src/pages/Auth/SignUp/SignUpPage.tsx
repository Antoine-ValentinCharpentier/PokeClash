import React from 'react';
import SplitPage from '../../../components/Layout/AuthLayout';
import SignUpForm from './components/SignUpForm'

import '../../../assets/style/components/ui/Pokeball/Pokeball.css'


interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  return (
    <SplitPage form={<SignUpForm/>}/>
  );
};

export default SignUpPage;
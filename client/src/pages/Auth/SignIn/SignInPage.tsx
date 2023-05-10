import React from 'react';
import SplitPage from '../../../components/Layout/AuthLayout';
import SignInForm from './components/SignInForm'

import '../../../assets/style/components/ui/Pokeball/Pokeball.css'


interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  return (
    <SplitPage form={<SignInForm/>}/>
  );
};

export default SignInPage;
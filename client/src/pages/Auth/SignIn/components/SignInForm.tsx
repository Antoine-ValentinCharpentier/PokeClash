import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import Form from '../../../../components/Form/Form'
import FormItem from '../../../../components/Form/FormItem'

import {signinLocal} from '../../../../api/auth'
import '../../../../assets/style/pages/auth/form.css'

import dictionnary from '../../../../assets/locales/translations/fr.json'
import AuthContext from '../../../../contexts/AuthContext';

interface SignInPageProps {}

type SignInFormValuesProps = {
  username?: string,
  email?: string,
  password?: string,
}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { login } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

    async function handleSubmit(values: SignInFormValuesProps) {
      if(values.password && values.email) {
        setIsLoading(true)
        const { email, password } = values
        const res = await login(email, password)
        setIsLoading(false)
        if(res.success){
          navigate('/');
        } else {
          toast.error(dictionnary['account.invalidCredential'])
        }
      } else {
        toast.error(dictionnary['account.create.missingFields'])
      }
    }

  return (
  <div className='right-form'>
    <h2 className='form-title'>{dictionnary.signin}</h2>
    <Form onSubmit={handleSubmit}>
      <FormItem label={dictionnary.email} name="email">
        <input type="email" placeholder={dictionnary.email}/>
      </FormItem>
      <FormItem label={dictionnary.password} name="password">
        <input type="password" placeholder={dictionnary.password}/>
      </FormItem>
      <button type="submit" disabled={isLoading}>{dictionnary.signin}</button>
    </Form>
    <p className='alternative' onClick={() => navigate('/signup')}>{dictionnary['account.signin.alternative']}</p>
  </div>
    
  );
};

export default SignInPage;
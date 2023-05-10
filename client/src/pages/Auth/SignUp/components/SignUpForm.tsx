import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import Form from '../../../../components/Form/Form'
import FormItem from '../../../../components/Form/FormItem'

import {signupLocal} from '../../../../api/auth'
import '../../../../assets/style/pages/auth/form.css'

import dictionnary from '../../../../assets/locales/translations/fr.json'

interface SignUpPageProps {}

type SignupFormValuesProps = {
  username?: string,
  email?: string,
  password?: string,
}

const SignUpPage: React.FC<SignUpPageProps> = () => {

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

    async function handleSubmit(values: SignupFormValuesProps) {
      if(!values.username || !values.password || !values.email) {
        toast.error(dictionnary['account.create.missingFields'])
        return
      }
      setIsLoading(true)
      const res = await signupLocal({body: values})
      setIsLoading(false)
      if(res.success){
        toast.success(dictionnary['account.created'])
      } else if(res.code === 409) {
        toast.warn(dictionnary['account.exists'])
      } else {
        toast.error(dictionnary['account.notCreated'])
      }
    }

  return (
  <div className='right-form'>
    <h2 className='form-title'>{dictionnary.signup}</h2>
    <Form onSubmit={handleSubmit}>
      <FormItem label={dictionnary.username} name="username">
        <input type="text" placeholder={dictionnary.username}/>
      </FormItem>
      <FormItem label={dictionnary.email} name="email">
        <input type="email" placeholder={dictionnary.email}/>
      </FormItem>
      <FormItem label={dictionnary.password} name="password">
        <input type="password" placeholder={dictionnary.password}/>
      </FormItem>
      <button type="submit" disabled={isLoading}>{dictionnary.signup}</button>
    </Form>
    <p className='alternative' onClick={() => navigate('/signin')}>{dictionnary['account.signup.alternative']}</p>
  </div>
    
  );
};

export default SignUpPage;
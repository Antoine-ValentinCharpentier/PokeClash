import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import AuthContext from '../../contexts/AuthContext'

type PrivatePageProps = {
    children: React.ReactNode;
};

const PrivatePage = ({ children } : PrivatePageProps) => {
  const { tokens } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens.accessToken) {
      navigate('/signin');
    }
  }, [tokens, navigate]);
  

  return <>{children}</>
}

export default PrivatePage

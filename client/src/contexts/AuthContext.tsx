import React, { createContext, useState } from 'react'
import { InternalAxiosRequestConfig } from "axios";
import { signinLocal } from '../api/auth'
import { request } from '../api/request'

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export type AuthContextType = {
    user: {
        id: string | null,
        username: string | null,
        email: string | null
    },
    tokens: {
      accessToken: string | null;
      refreshToken: string | null;
    };
    login: (email: string, password: string) => Promise<{ success: boolean, error: string | null }> ;
};

const defaultUser = {
    id: null,
    username: null,
    email: null
};

const defaultTokens = {
    accessToken: null,
    refreshToken: null,
};

const defaultValue = {
    user: defaultUser,
    tokens: defaultTokens,
    login: async (email: string, password: string) => {
        return Promise.resolve({ success: false, error: null });
    },
}

const AuthContext = createContext<AuthContextType>(defaultValue)

export const AuthContextProvider = ({ children } : AuthContextProviderProps) => {
  const [user, setUser] = useState(defaultUser)
  const [tokens, setTokens] = useState(defaultTokens)
  const [axiosInterceptor, setAxiosInterceptor] = useState<null | number>(null);

  const updateInterceptors = (accessToken : string) : void => {
    if (!accessToken) {
        return
    }
    if (axiosInterceptor) {
        request.interceptors.request.eject(axiosInterceptor)
    }
    setAxiosInterceptor(() => {
      const newInterceptor = request.interceptors.request.use( (config : InternalAxiosRequestConfig<any>) => {
        const headers = config.headers || {};
        headers.authorization = `Bearer ${accessToken}`; 
        const updatedConfig = {
          ...config,
          headers,
        };
        return updatedConfig;
      })
      return newInterceptor
    })
  }

  async function login(email: string, password: string) {
    const response = await signinLocal({ body: { email, password } })
    if (response.success) {
      const {user, tokens} = response.data
      localStorage.setItem('token', tokens.refreshToken)
      setTokens(tokens)
      setUser(user)
      updateInterceptors(tokens.accessToken)
    }
    return response
  }

  const values = {
    user,
    tokens,
    login,
  }

  return <>
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
  </>
}

export default AuthContext

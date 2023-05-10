import axios from 'axios'

const THIRTY_SECONDES = 30 * 1000

type RequestProps = {
  method: 'GET' | 'POST' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
};

interface ParamsQueryProps {
  [key: string]: any;
}

export type OptionsProps = {
  body?: object,
  params?: ParamsQueryProps | null,
  query?: ParamsQueryProps | null,
};

type ResultType = {
  success: boolean,
  code: number | null,
  data: any,
  error: string | null,
};

export async function createRequest({ method, url: rawUrl } : RequestProps, options: OptionsProps) {
    const { body = {}, params = null, query = null } = options
    const result : ResultType = {
      success: true,
      code: null,
      data: {},
      error: null,
    }

    let url = rawUrl
    if(params){
      url = Object.keys(params).reduce((acc, val) => acc.replaceAll(`:${val}`, params[val]), url)
    }
    
    if (query) {
        url += '?'
        url = Object.keys(query).reduce((acc, val) => acc += `${val}=${query[val]}&`, url)
    }

    try {
      const response = await request({
        method,
        url,
        data: body,
      })

      result.code = response.status
      result.data = response.data
  
    } catch (error: any) {
      console.error(error)
      result.success = false

      if (error.response) {
        result.code = error.response.status
        result.error = error.response.data.error
        result.data = error.response.data.message
      } else {
        result.code = 500
        result.error = 'Server Down'
      }

    }
    return result
}

export const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: THIRTY_SECONDES,
    validateStatus: code => code >= 200 && code < 300,
  })
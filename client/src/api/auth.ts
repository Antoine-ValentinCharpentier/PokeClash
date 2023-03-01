import { createRequest } from './request'
import routes from './routes.json'

export const signupLocal = (options={}) => createRequest({ method: 'POST', url: routes.auth.local.signup }, options)
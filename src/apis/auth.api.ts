import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authAPI = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body),

  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),

  logout: (token: string) =>
    http.post('/logout', {
      Headers: { Authorization: token }
    })
}

export default authAPI

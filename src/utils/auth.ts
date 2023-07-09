import { User } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const token = localStorage.getItem('profile')
  return token ? JSON.parse(token) : null
}

export const clearTokenFromLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  let tokent = Cookies.get(TokenKey)
  if (!tokent) {
    tokent = localStorage.getItem(TokenKey)
  }
  return tokent
}

export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}

import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) { //stores the 3 values returned by server
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code, //post code to server
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/") //remove the code from the url
      })
      .catch(() => {
        window.location = "/" //if token expired, redirect user to Login page
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000) //call this one minute before token expires

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn]) //if either of them change

  return accessToken
}
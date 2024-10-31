// - ./src/components/Login.tsx

import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {baseUrl} from '../config'
import './Login.css'

function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement
    const newFormData = {
      ...formData,
      [targetElement.name]: targetElement.value,
    }
    setFormData(newFormData)
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    try {
      const response = await axios.post(`${baseUrl}/login`, formData)
      localStorage.setItem("token", response.data.token)
      fetchUser()
      navigate("/Specialists")
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <div className="login-section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email" className="label has-text-white">
              Email
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
            <label htmlFor="password" className="label has-text-white">
              Password
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errorMessage && (
              <small className="has-text-danger">{errorMessage}</small>
            )}
          </div>
          <br />
          <button className="submit" type="submit" style={{ fontSize: '23px', fontWeight: 'bold', color: 'gold' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
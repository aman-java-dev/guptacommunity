import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await axios.post('http://localhost:8080/api/auth/login', formData)
      navigate('/home')
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Login failed. Please check your details and try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <aside aria-label="Gupta Samaj" className="auth-brand">
        <div aria-hidden="true" className="auth-brand-mark">GS</div>
        <div className="auth-brand-copy">
          <p className="auth-brand-kicker">Community portal</p>
          <h2>Gupta Samaj</h2>
        </div>
        <p className="auth-brand-footer">Member access</p>
      </aside>

      <main className="auth-main">
        <section className="auth-content">
          <p className="auth-kicker">Welcome back</p>
          <h1>Sign in to your account</h1>
          <p className="auth-description">Enter your details to continue.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              Email address
              <input
                autoComplete="email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                required
                type="email"
                value={formData.email}
              />
            </label>

            <label className="auth-field">
              Password
              <input
                autoComplete="current-password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
                type="password"
                value={formData.password}
              />
            </label>

            <button className="auth-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            {errorMessage && (
              <p className="auth-message auth-message--error" role="alert">
                {errorMessage}
              </p>
            )}
          </form>

          <p className="auth-switch">
            New to the community? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </main>
    </div>
  )
}

export default Login
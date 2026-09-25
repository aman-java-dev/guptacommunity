import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await axios.post('http://localhost:8080/api/auth/register', formData)
      setIsSuccess(true)
      setMessage('Registration successful.')
      setFormData({ name: '', email: '', password: '' })
    } catch (error) {
      setIsSuccess(false)
      setMessage(
        error.response?.data?.message || 'Registration failed. Please try again.',
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
          <p className="auth-kicker">Create account</p>
          <h1>Join Gupta Samaj</h1>
          <p className="auth-description">Set up your account to get started.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              Full name
              <input
                autoComplete="name"
                name="name"
                onChange={handleChange}
                placeholder="Your name"
                required
                type="text"
                value={formData.name}
              />
            </label>

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
                autoComplete="new-password"
                name="password"
                onChange={handleChange}
                placeholder="Create a password"
                required
                type="password"
                value={formData.password}
              />
            </label>

            <button className="auth-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>

            {message && (
              <p
                className={`auth-message ${isSuccess ? 'auth-message--success' : 'auth-message--error'}`}
                role="status"
              >
                {message}
              </p>
            )}
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </section>
      </main>
    </div>
  )
}

export default Register
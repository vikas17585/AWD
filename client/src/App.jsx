import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function validate(values) {
    const errs = {}
    if (!values.name.trim()) errs.name = 'Name is required'
    if (!values.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'Invalid email'
    if (!values.message.trim()) errs.message = 'Message is required'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length === 0) {
      // Replace this with real submit logic (API call)
      console.info('Form submitted', form)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 3500)
    }
  }

  return (
    <div className="app-root">
      <header>
        <h1>Contact Us</h1>
        <p>Send us a message and we'll get back to you shortly.</p>
      </header>

      <main>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
            />
            {errors.message && <div className="error">{errors.message}</div>}
          </div>

          <div className="actions">
            <button type="submit" className="btn">Send Message</button>
            {sent && <span className="sent">Message sent!</span>}
          </div>
        </form>
      </main>
    </div>
  )
}

export default App

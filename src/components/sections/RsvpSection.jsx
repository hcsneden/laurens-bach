import { useState } from 'react'
import { SectionHeader } from '../layout/Section'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwv-xHkcBoNCEXPf8JyV0uQkY_cbcuULDq03LxdgwYorsGJLUpLkep-f0kbsgkKeU0T/exec'

export function RsvpSection() {
  const [form, setForm] = useState({ boat: '', foodRestrictions: '', nightOut: '', suggestions: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.boat || !form.nightOut) return
    setStatus('submitting')
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(form),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="questions" className="section section-rsvp">
        <SectionHeader title="Qs" subtitle="Answer a few questions plz" />
        <div className="rsvp-success">
          <p className="rsvp-success-emoji">🎉</p>
          <p className="rsvp-success-text">You're all set! See you in July!</p>
        </div>
      </section>
    )
  }

  return (
    <section id="questions" className="section section-rsvp">
      <SectionHeader title="Qs" subtitle="Answer a few questions plz" />
      <form className="rsvp-form" onSubmit={handleSubmit}>

        <div className="rsvp-field">
          <label className="rsvp-label">Are you interesting in renting a boat one day? (~$40–50/person)</label>
          <div className="rsvp-radio-group">
            {['Yes', 'No', 'Maybe'].map(opt => (
              <label key={opt} className={`rsvp-radio-label ${form.boat === opt ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="boat"
                  value={opt}
                  checked={form.boat === opt}
                  onChange={handleChange}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="rsvp-field">
          <label className="rsvp-label" htmlFor="rsvp-food">Any food restrictions or allergies?</label>
          <input
            id="rsvp-food"
            className="rsvp-input"
            type="text"
            name="foodRestrictions"
            placeholder="None, vegetarian, gluten-free, etc."
            value={form.foodRestrictions}
            onChange={handleChange}
          />
        </div>

        <div className="rsvp-field">
          <label className="rsvp-label">Would you rather go out to a bar one night or keep it in the Airbnb?</label>
          <div className="rsvp-radio-group">
            {['Go out', 'Stay in', 'Either is great'].map(opt => (
              <label key={opt} className={`rsvp-radio-label ${form.nightOut === opt ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="nightOut"
                  value={opt}
                  checked={form.nightOut === opt}
                  onChange={handleChange}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="rsvp-field">
          <label className="rsvp-label" htmlFor="rsvp-suggestions">Any requests or suggestions?</label>
          <input
            id="rsvp-suggestions"
            className="rsvp-input"
            type="text"
            name="suggestions"
            placeholder="Games, drinks, anything..."
            value={form.suggestions}
            onChange={handleChange}
          />
        </div>

        {status === 'error' && (
          <p className="rsvp-error">Something went wrong — try again?</p>
        )}

        <button className="rsvp-submit" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}

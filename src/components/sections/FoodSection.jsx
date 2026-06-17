import { useState, useEffect } from 'react'
import { SectionHeader } from '../layout/Section'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyuoLBQeCpRSs1Rsn2GGRLi_46NJwNFB7WAt4bBwkYUtKX9hbdfeDwal0I_VSzt_E2n/exec'

const DAY_GROUPS = [
  {
    day: 'Thursday',
    color: 'thu',
    meals: [{ key: 'Thursday Dinner', meal: 'Dinner' }],
  },
  {
    day: 'Friday',
    color: 'fri',
    meals: [
      { key: 'Friday Lunch', meal: 'Lunch' },
      { key: 'Friday Dinner', meal: 'Dinner' },
    ],
  },
  {
    day: 'Saturday',
    color: 'sat',
    meals: [
      { key: 'Saturday Lunch', meal: 'Lunch' },
      { key: 'Saturday Dinner', meal: 'Dinner' },
    ],
  },
]

function emptyForm() {
  return { names: ['', '', ''], dish: '' }
}

export function FoodSection({ meals, setMeals, loading }) {
  const [forms, setForms] = useState({})
  const [submitStatus, setSubmitStatus] = useState({}) // mealKey -> 'idle' | 'submitting' | 'success' | 'error'

  // Pre-populate forms from loaded sheet data
  useEffect(() => {
    if (!meals || Object.keys(meals).length === 0) return
    setForms(prev => {
      const next = { ...prev }
      for (const [key, data] of Object.entries(meals)) {
        if (!next[key]) {
          next[key] = { names: [...data.names], dish: data.dish }
        }
      }
      return next
    })
  }, [meals])

  function getForm(mealKey) {
    return forms[mealKey] || emptyForm()
  }

  function setName(mealKey, index, value) {
    setForms(prev => {
      const form = prev[mealKey] || emptyForm()
      const names = [...form.names]
      names[index] = value
      return { ...prev, [mealKey]: { ...form, names } }
    })
  }

  function setDish(mealKey, value) {
    setForms(prev => {
      const form = prev[mealKey] || emptyForm()
      return { ...prev, [mealKey]: { ...form, dish: value } }
    })
  }

  async function handleSubmit(e, mealKey) {
    e.preventDefault()
    const form = getForm(mealKey)
    setSubmitStatus(s => ({ ...s, [mealKey]: 'submitting' }))

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          action: 'meal',
          meal: mealKey,
          name1: form.names[0],
          name2: form.names[1],
          name3: form.names[2],
          dish: form.dish,
        }),
      })

      setMeals(prev => ({
        ...prev,
        [mealKey]: { names: [...form.names], dish: form.dish },
      }))
      setSubmitStatus(s => ({ ...s, [mealKey]: 'idle' }))
    } catch {
      setSubmitStatus(s => ({ ...s, [mealKey]: 'error' }))
    }
  }

  return (
    <section id="food" className="section section-food">
      <SectionHeader title="Food" subtitle="sign up to cook a meal" />

      {loading ? (
        <p className="meal-loading">Loading...</p>
      ) : (
        <div className="meal-days">
          {DAY_GROUPS.map(({ day, color, meals: dayMeals }) => (
            <div key={day} className={`meal-day-group meal-day-group--${color}`}>
              <span className="meal-day-label">{day}</span>
              <div className="meal-day-cards">
                {dayMeals.map(({ key, meal }) => {
                  const form = getForm(key)
                  const status = submitStatus[key] || 'idle'

                  return (
                    <div key={key} className={`meal-card meal-card--${color}`}>
                      <div className="meal-card-header">
                        <span className="meal-card-meal">{meal}</span>
                      </div>

                      <form className="meal-form" onSubmit={e => handleSubmit(e, key)}>
                        <div className="meal-names">
                          {[0, 1, 2].map(i => (
                            <input
                              key={i}
                              className="meal-input meal-input-name"
                              type="text"
                              placeholder={`Person ${i + 1}`}
                              value={form.names[i]}
                              onChange={e => setName(key, i, e.target.value)}
                            />
                          ))}
                        </div>

                        <input
                          className="meal-input meal-input-dish"
                          type="text"
                          placeholder="What are you cooking?"
                          value={form.dish}
                          onChange={e => setDish(key, e.target.value)}
                        />

                        {status === 'error' && (
                          <p className="meal-error">Something went wrong, try again</p>
                        )}

                        <button
                          className="meal-btn meal-btn-submit"
                          type="submit"
                          disabled={status === 'submitting'}
                        >
                          {status === 'submitting' ? '...' : 'Save'}
                        </button>
                      </form>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

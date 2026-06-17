import { useState, useEffect } from 'react'
import { parseFoodCSV } from '../utils/parseCSV'

export function useMeals(csvUrl) {
  const [meals, setMeals] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMeals() {
      if (!csvUrl) {
        setLoading(false)
        return
      }
      try {
        const response = await fetch(csvUrl)
        const csv = await response.text()
        setMeals(parseFoodCSV(csv))
        setLoading(false)
      } catch (err) {
        console.error('Error fetching meals:', err)
        setError('fetch-error')
        setLoading(false)
      }
    }
    fetchMeals()
  }, [csvUrl])

  return { meals, setMeals, loading, error }
}

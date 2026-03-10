import { useState, useEffect } from 'react'
import { parseFlightsCSV } from '../utils/parseCSV'

/**
 * Custom hook for fetching flight data from Google Sheets
 * @param {string} csvUrl - The published Google Sheet CSV URL
 * @returns {Object} - { flights, loading, error }
 */
export function useFlights(csvUrl) {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFlights() {
      if (!csvUrl) {
        setLoading(false)
        setError('no-url')
        return
      }

      try {
        const response = await fetch(csvUrl)
        const csv = await response.text()
        const data = parseFlightsCSV(csv)
        setFlights(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching flights:', err)
        setError('fetch-error')
        setLoading(false)
      }
    }

    fetchFlights()
  }, [csvUrl])

  return { flights, loading, error }
}

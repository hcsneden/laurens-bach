import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Sparkle, PlaneIcon } from '../ui'

/**
 * Parse a date/time string for sorting
 * Handles formats like "7/9 10:30am", "July 9, 2026 10:30 AM", etc.
 */
function parseDateTime(dateTimeStr) {
  if (!dateTimeStr) return new Date(9999, 11, 31) // Sort empty dates last

  // Try to parse the date string
  const parsed = Date.parse(dateTimeStr)
  if (!isNaN(parsed)) return new Date(parsed)

  // Try common formats like "7/9 10:30am"
  const match = dateTimeStr.match(/(\d{1,2})\/(\d{1,2})\s*(\d{1,2}):?(\d{2})?\s*(am|pm)?/i)
  if (match) {
    const [, month, day, hours, minutes = '0', ampm] = match
    let hour = parseInt(hours)
    if (ampm?.toLowerCase() === 'pm' && hour !== 12) hour += 12
    if (ampm?.toLowerCase() === 'am' && hour === 12) hour = 0
    return new Date(2026, parseInt(month) - 1, parseInt(day), hour, parseInt(minutes))
  }

  return new Date(9999, 11, 31)
}

/**
 * Flight card component
 */
function FlightCard({ flight }) {
  return (
    <div className="flight-card">
      <div className="flight-card-header">
        <PlaneIcon size={18} />
        <span className="flight-name">{flight.name}</span>
        {flight.origin && <span className="flight-origin">from {flight.origin}</span>}
      </div>
      <div className="flight-details">
        {/* Landing Info */}
        <div className="flight-section">
          <span className="flight-section-title">Landing</span>
          {flight.landingDateTime && (
            <div className="flight-row">
              <span className="flight-label">When</span>
              <span className="flight-value">{flight.landingDateTime}</span>
            </div>
          )}
          {flight.landingFlight && (
            <div className="flight-row">
              <span className="flight-label">Flight</span>
              <span className="flight-value">{flight.landingFlight}</span>
            </div>
          )}
        </div>

        {/* Departing Info */}
        {(flight.departingDateTime || flight.departingFlight) && (
          <div className="flight-section">
            <span className="flight-section-title">Departing</span>
            {flight.departingDateTime && (
              <div className="flight-row">
                <span className="flight-label">When</span>
                <span className="flight-value">{flight.departingDateTime}</span>
              </div>
            )}
            {flight.departingFlight && (
              <div className="flight-row">
                <span className="flight-label">Flight</span>
                <span className="flight-value">{flight.departingFlight}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

FlightCard.propTypes = {
  flight: PropTypes.shape({
    name: PropTypes.string.isRequired,
    origin: PropTypes.string,
    landingFlight: PropTypes.string,
    landingDateTime: PropTypes.string,
    landingAirport: PropTypes.string,
    departingFlight: PropTypes.string,
    departingDateTime: PropTypes.string,
    departingAirport: PropTypes.string
  }).isRequired
}

/**
 * Flights section component with airport tabs
 */
export function FlightsSection({ flights, loading, error }) {
  const [activeTab, setActiveTab] = useState(null)

  // Group flights by airport and sort by time
  const { airports, flightsByAirport } = useMemo(() => {
    if (!flights || flights.length === 0) {
      return { airports: [], flightsByAirport: {} }
    }

    const grouped = {}

    flights.forEach(flight => {
      const airport = flight.landingAirport?.trim() || 'Other'
      if (!grouped[airport]) {
        grouped[airport] = []
      }
      grouped[airport].push(flight)
    })

    // Sort flights within each airport by landing time
    Object.keys(grouped).forEach(airport => {
      grouped[airport].sort((a, b) => {
        const timeA = parseDateTime(a.landingDateTime)
        const timeB = parseDateTime(b.landingDateTime)
        return timeA - timeB
      })
    })

    // Get sorted airport list (alphabetically, but "Other" last)
    const airportList = Object.keys(grouped).sort((a, b) => {
      if (a === 'Other') return 1
      if (b === 'Other') return -1
      return a.localeCompare(b)
    })

    return { airports: airportList, flightsByAirport: grouped }
  }, [flights])

  // Set initial active tab
  useMemo(() => {
    if (airports.length > 0 && activeTab === null) {
      setActiveTab(airports[0])
    }
  }, [airports, activeTab])

  const currentFlights = activeTab ? flightsByAirport[activeTab] || [] : []

  return (
    <section id="flights" className="section section-flights">
      <div className="section-header">
        <Sparkle className="section-sparkle" size={28} />
        <h2 className="section-title">Flights</h2>
        <Sparkle className="section-sparkle" size={28} />
      </div>
      <p className="section-subtitle">When is everyone arriving?</p>

      <div className="flights-container">
        {loading ? (
          <div className="flights-loading">
            <PlaneIcon size={32} />
            <p>Loading flights...</p>
          </div>
        ) : error === 'no-url' ? (
          <div className="flights-setup">
            <PlaneIcon size={32} />
            <p className="setup-title">Connect Your Google Sheet</p>
            <p className="setup-instructions">
              1. Create a Google Sheet with columns: <strong>Name, Arrival Date, Arrival Time, Flight Number, Departure Date</strong><br/>
              2. Go to File → Share → Publish to web<br/>
              3. Select CSV format and click Publish<br/>
              4. Copy the URL and paste it in <code>App.jsx</code> at <code>GOOGLE_SHEET_CSV_URL</code>
            </p>
          </div>
        ) : error ? (
          <div className="flights-error">
            <p>Could not load flight data. Please check the Google Sheet URL.</p>
          </div>
        ) : flights.length === 0 ? (
          <div className="flights-empty">
            <PlaneIcon size={32} />
            <p>No flights added yet!</p>
          </div>
        ) : (
          <div className="flights-file">
            {/* Airport Tabs */}
            <div className="flights-tabs">
              {airports.map(airport => (
                <button
                  key={airport}
                  className={`flights-tab ${activeTab === airport ? 'active' : ''}`}
                  onClick={() => setActiveTab(airport)}
                >
                  {airport}
                  <span className="tab-count">{flightsByAirport[airport].length}</span>
                </button>
              ))}
            </div>

            {/* Flight Cards */}
            <div className="flights-grid">
              {currentFlights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

FlightsSection.propTypes = {
  flights: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
}

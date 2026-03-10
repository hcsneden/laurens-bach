import { useState, useEffect } from 'react'
import './App.css'

const TARGET_DATE = new Date('2026-07-09T00:00:00')

// Replace this with your published Google Sheet CSV URL
// To get this: Google Sheet > File > Share > Publish to web > Select CSV > Publish
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgpYCRRorwcohrbMhtXij_wm11O5xXrLpUGEiEgxLc2O8BNauGIcAdP7D9mqNow-qDXFYORWSk_M0g/pub?output=csv'

function calculateTimeLeft() {
  const now = new Date()
  const difference = TARGET_DATE - now

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  }
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n')

  // Parse CSV line handling quotes
  const parseLine = (line) => {
    const values = []
    let current = ''
    let inQuotes = false

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    return values
  }

  // Skip the first row (Landing/Departing header) and use second row as headers
  // Then map to a normalized structure
  const dataStartIndex = lines[0].toLowerCase().includes('landing') ? 2 : 1

  return lines.slice(dataStartIndex).filter(line => line.trim()).map(line => {
    const values = parseLine(line)

    // Map to our expected structure based on column position:
    // 0: Name, 1: Origin, 2: Landing Flight, 3: Landing Date/Time, 4: Landing Airport
    // 5: Departing Flight, 6: Departing Date/Time, 7: Departing Airport
    return {
      name: values[0] || '',
      origin: values[1] || '',
      landingFlight: values[2] || '',
      landingDateTime: values[3] || '',
      landingAirport: values[4] || '',
      departingFlight: values[5] || '',
      departingDateTime: values[6] || '',
      departingAirport: values[7] || ''
    }
  })
}

// Four-pointed sparkle star (Y2K style)
function Sparkle({ className, size = 24, style }) {
  return (
    <svg
      className={`sparkle ${className || ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
    >
      <path d="M12 0C12 0 12 8 12 12C12 8 12 0 12 0Z M12 24C12 24 12 16 12 12C12 16 12 24 12 24Z M0 12C0 12 8 12 12 12C8 12 0 12 0 12Z M24 12C24 12 16 12 12 12C16 12 24 12 24 12Z" />
      <ellipse cx="12" cy="2" rx="2" ry="4" />
      <ellipse cx="12" cy="22" rx="2" ry="4" />
      <ellipse cx="2" cy="12" rx="4" ry="2" />
      <ellipse cx="22" cy="12" rx="4" ry="2" />
    </svg>
  )
}

// Diamond/rhombus shape
function Diamond({ className, size = 16, style }) {
  return (
    <svg
      className={`diamond ${className || ''}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      style={style}
    >
      <path d="M8 0L16 8L8 16L0 8L8 0Z" />
    </svg>
  )
}

// Plane icon for flights
function PlaneIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  )
}

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)
  const [flights, setFlights] = useState([])
  const [flightsLoading, setFlightsLoading] = useState(true)
  const [flightsError, setFlightsError] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Fetch flight data from Google Sheet
  useEffect(() => {
    async function fetchFlights() {
      if (!GOOGLE_SHEET_CSV_URL) {
        setFlightsLoading(false)
        setFlightsError('no-url')
        return
      }

      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL)
        const csv = await response.text()
        const data = parseCSV(csv)
        setFlights(data)
        setFlightsLoading(false)
      } catch (err) {
        console.error('Error fetching flights:', err)
        setFlightsError('fetch-error')
        setFlightsLoading(false)
      }
    }

    fetchFlights()
  }, [])

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'FLIGHTS', href: '#flights' },
    { name: 'SCHEDULE', href: '#schedule' },
    { name: 'LOCATION', href: '#location' },
    { name: 'TO-DOS', href: '#todos' }
  ]

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      {/* Corner sparkles */}
      <Sparkle className="corner-sparkle corner-sparkle-1" size={45} />
      <Sparkle className="corner-sparkle corner-sparkle-2" size={35} />
      <Sparkle className="corner-sparkle corner-sparkle-3" size={50} />
      <Sparkle className="corner-sparkle corner-sparkle-4" size={40} />

      <header className="header">
        <nav className="nav">
          {navItems.map((item, index) => (
            <div key={item.name} className="nav-item-wrapper">
              <a
                href={item.href}
                className="nav-link"
                onClick={(e) => scrollToSection(e, item.href)}
              >
                {item.name}
              </a>
              {index < navItems.length - 1 && (
                <Diamond className="nav-diamond" size={8} />
              )}
            </div>
          ))}
        </nav>
      </header>

      <main className="main">
        {/* ============ HOME SECTION ============ */}
        <section id="home" className="section section-home">
          {/* Floating sparkles */}
          <Sparkle className="floating-sparkle sparkle-1" size={32} />
          <Sparkle className="floating-sparkle sparkle-2" size={24} />
          <Sparkle className="floating-sparkle sparkle-3" size={28} />
          <Sparkle className="floating-sparkle sparkle-4" size={20} />
          <Sparkle className="floating-sparkle sparkle-5" size={36} />
          <Sparkle className="floating-sparkle sparkle-6" size={22} />

          {/* Retro window/frame containing the content */}
          <div className="retro-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot dot-1"></span>
                <span className="dot dot-2"></span>
                <span className="dot dot-3"></span>
              </div>
            </div>
            <div className="window-content">
              <div className="hero-content">
                <h1 className="title">
                  <span className="title-script">Lauren's</span>
                  <span className="title-secondary">Bachelorette</span>
                </h1>
              </div>

              <div className="countdown-container">
                <div className="countdown">
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="countdown-label">DAYS</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">HOURS</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label">MINUTES</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label">SECONDS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="event-info">
            <p className="event-date">07.09.2026</p>
            <p className="event-hashtag">#LAURENSBACHELORETTE</p>
          </div>
        </section>

        {/* ============ FLIGHTS SECTION ============ */}
        <section id="flights" className="section section-flights">
          <div className="section-header">
            <Sparkle className="section-sparkle" size={28} />
            <h2 className="section-title">Flights</h2>
            <Sparkle className="section-sparkle" size={28} />
          </div>
          <p className="section-subtitle">When is everyone arriving?</p>

          <div className="flights-container">
            {flightsLoading ? (
              <div className="flights-loading">
                <PlaneIcon size={32} />
                <p>Loading flights...</p>
              </div>
            ) : flightsError === 'no-url' ? (
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
            ) : flightsError ? (
              <div className="flights-error">
                <p>Could not load flight data. Please check the Google Sheet URL.</p>
              </div>
            ) : flights.length === 0 ? (
              <div className="flights-empty">
                <PlaneIcon size={32} />
                <p>No flights added yet!</p>
              </div>
            ) : (
              <div className="flights-grid">
                {flights.map((flight, index) => (
                  <div key={index} className="flight-card">
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
                        {flight.landingAirport && (
                          <div className="flight-row">
                            <span className="flight-label">Airport</span>
                            <span className="flight-value">{flight.landingAirport}</span>
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
                          {flight.departingAirport && (
                            <div className="flight-row">
                              <span className="flight-label">Airport</span>
                              <span className="flight-value">{flight.departingAirport}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============ SCHEDULE SECTION ============ */}
        <section id="schedule" className="section section-schedule">
          <div className="section-header">
            <Sparkle className="section-sparkle" size={28} />
            <h2 className="section-title">Schedule</h2>
            <Sparkle className="section-sparkle" size={28} />
          </div>
          <p className="section-subtitle">What's the plan?</p>

          <div className="coming-soon">
            <p>Coming soon...</p>
          </div>
        </section>

        {/* ============ LOCATION SECTION ============ */}
        <section id="location" className="section section-location">
          <div className="section-header">
            <Sparkle className="section-sparkle" size={28} />
            <h2 className="section-title">Location</h2>
            <Sparkle className="section-sparkle" size={28} />
          </div>
          <p className="section-subtitle">Where are we going?</p>

          <div className="coming-soon">
            <p>Coming soon...</p>
          </div>
        </section>

        {/* ============ TO-DOS SECTION ============ */}
        <section id="todos" className="section section-todos">
          <div className="section-header">
            <Sparkle className="section-sparkle" size={28} />
            <h2 className="section-title">To-Dos</h2>
            <Sparkle className="section-sparkle" size={28} />
          </div>
          <p className="section-subtitle">What to bring & do before the trip</p>

          <div className="coming-soon">
            <p>Coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

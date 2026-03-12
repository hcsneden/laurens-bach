import './App.css'
import { Sparkle } from './components/ui'
import { Header } from './components/layout'
import { HomeSection, FlightsSection, LocationSection, PlaceholderSection } from './components/sections'
import { useCountdown, useFlights } from './hooks'
import { TARGET_DATE, GOOGLE_SHEET_CSV_URL, NAV_ITEMS, AIRBNB_LISTING } from './constants'

function App() {
  const timeLeft = useCountdown(TARGET_DATE)
  const { flights, loading: flightsLoading, error: flightsError } = useFlights(GOOGLE_SHEET_CSV_URL)

  return (
    <div className="app">
      {/* Corner sparkles */}
      <Sparkle className="corner-sparkle corner-sparkle-1" size={45} />
      <Sparkle className="corner-sparkle corner-sparkle-2" size={35} />
      <Sparkle className="corner-sparkle corner-sparkle-3" size={50} />
      <Sparkle className="corner-sparkle corner-sparkle-4" size={40} />

      <Header navItems={NAV_ITEMS} />

      <main className="main">
        <HomeSection timeLeft={timeLeft} />

        <FlightsSection
          flights={flights}
          loading={flightsLoading}
          error={flightsError}
        />

        <PlaceholderSection
          id="schedule"
          className="section-schedule"
          title="Schedule"
          subtitle="What's the plan?"
        />

        <LocationSection listing={AIRBNB_LISTING} />

        <PlaceholderSection
          id="todos"
          className="section-todos"
          title="To-Dos"
          subtitle="What to bring & do before the trip"
        />
      </main>
      
    </div>
  )
}

export default App

import { useEffect } from 'react'
import './App.css'
import { Sparkle } from './components/ui'
import { Header } from './components/layout'
import { HomeSection, FlightsSection, LocationSection, ScheduleSection, RsvpSection, FoodSection } from './components/sections'
import { useCountdown, useFlights, useMeals } from './hooks'
import { TARGET_DATE, GOOGLE_SHEET_CSV_URL, FOOD_SHEET_CSV_URL, NAV_ITEMS, AIRBNB_LISTING } from './constants'

function App() {
  const timeLeft = useCountdown(TARGET_DATE)
  const { flights, loading: flightsLoading, error: flightsError } = useFlights(GOOGLE_SHEET_CSV_URL)
  const { meals, setMeals, loading: mealsLoading } = useMeals(FOOD_SHEET_CSV_URL)

  useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'instant' })
  }, [])

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

        <ScheduleSection />

        <LocationSection listing={AIRBNB_LISTING} />

        <FoodSection meals={meals} setMeals={setMeals} loading={mealsLoading} />

        <RsvpSection />
      </main>
      
    </div>
  )
}

export default App

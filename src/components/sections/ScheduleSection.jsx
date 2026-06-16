import { SectionHeader } from '../layout/Section'

const SCHEDULE = [
  {
    day: 'Thursday',
    date: 'July 9',
    activities: [
      { time: 'Afternoon – Evening', description: 'Everyone arrives & checks in to the Airbnb' },
      { time: 'Dinner', description: 'Dinner at the house' },
    ],
    accent: 'var(--color-purple)',
    bg: 'linear-gradient(135deg, var(--color-lavender-light) 0%, var(--color-pink-light) 100%)',
  },
  {
    day: 'Friday',
    date: 'July 10',
    activities: [
      { time: '9 AM – 3 PM', description: 'Boat rental (maybe). Floatilla (definitely)' },
      { time: 'Evening', description: 'Picnic in the yard. Attire TBD but bring some whimsy' },
      { time: 'Night', description: 'Find a dive bar if we want to go out' }
    ],
    accent: 'var(--color-pink-hot)',
    bg: 'linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-lavender-light) 100%)',
  },
  {
    day: 'Saturday',
    date: 'July 11',
    activities: [
      { time: 'All Day', description: 'Yard games, vibing poolside. Bring an attitude.' },
      { time: 'Evening', description: 'Karaoke. Bring a bigger attitude.' },
    ],
    accent: 'var(--color-purple-dark)',
    bg: 'linear-gradient(135deg, var(--color-lavender-light) 0%, #E0F5E8 100%)',
  },
  {
    day: 'Sunday',
    date: 'July 12',
    activities: [
      { time: 'Morning', description: 'Chill at the house' },
      { time: '11 AM', description: 'Check out' },
    ],
    accent: 'var(--color-lavender)',
    bg: 'linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-lavender-light) 100%)',
  },
]

function DayCard({ day, date, activities, accent, bg }) {
  return (
    <div className="schedule-day-card" style={{ '--day-accent': accent, '--day-bg': bg }}>
      <div className="schedule-day-header">
        <div className="schedule-day-title-group">
          <span className="schedule-day-name">{day}</span>
          <span className="schedule-day-date">{date}</span>
        </div>
      </div>
      {activities && activities.length > 0 && (
        <ul className="schedule-activities">
          {activities.map((a, i) => (
            <li key={i} className="schedule-activity">
              <span className="schedule-activity-time">{a.time}</span>
              <span className="schedule-activity-desc">{a.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ScheduleSection() {
  return (
    <section id="schedule" className="section section-schedule">
      <SectionHeader title="Schedule" subtitle="This is tentative, we are all free agents" />
      <div className="schedule-grid">
        {SCHEDULE.map((d) => (
          <DayCard key={d.day} {...d} />
        ))}
      </div>
    </section>
  )
}

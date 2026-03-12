import PropTypes from 'prop-types'
import { SectionHeader } from '../layout/Section'

/**
 * Placeholder section for upcoming content
 */
export function PlaceholderSection({ id, className, title, subtitle }) {
  return (
    <section id={id} className={`section ${className}`}>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="coming-soon">
        <p>Coming soon...</p>
      </div>
    </section>
  )
}

PlaceholderSection.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

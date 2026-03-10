import PropTypes from 'prop-types'
import { Sparkle } from '../ui'

/**
 * Section wrapper component
 */
export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

/**
 * Section header with title and sparkles
 */
export function SectionHeader({ title, subtitle }) {
  return (
    <>
      <div className="section-header">
        <Sparkle className="section-sparkle" size={28} />
        <h2 className="section-title">{title}</h2>
        <Sparkle className="section-sparkle" size={28} />
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

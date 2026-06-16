/**
 * Smooth scroll to a section by href
 */
export function scrollToSection(e, href) {
  e.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

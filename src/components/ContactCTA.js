import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import SectionLabel from './SectionLabel'

const ContactCTA = ({ label, headline, body, button }) => {
  if (!headline && !body) return null

  const isExternal =
    button && button.link && (button.link.startsWith('http') || button.link.startsWith('mailto'))

  return (
    <section className="sec-contact-cta">
      <div className="cta-inner">
        {label && <SectionLabel>{label}</SectionLabel>}
        {headline && <h2 className="cta-headline">{headline}</h2>}
        {body && <p className="cta-body">{body}</p>}
        {button && button.link && button.label && (
          <div className="cta-actions">
            {isExternal ? (
              <a
                href={button.link}
                className="btn-editorial"
                target={button.link.startsWith('http') ? '_blank' : undefined}
                rel={button.link.startsWith('http') ? 'noopener' : undefined}
              >
                {button.label}
              </a>
            ) : (
              <Link to={button.link} className="btn-editorial">
                {button.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

ContactCTA.propTypes = {
  label: PropTypes.string,
  headline: PropTypes.string,
  body: PropTypes.string,
  button: PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  }),
}

export default ContactCTA

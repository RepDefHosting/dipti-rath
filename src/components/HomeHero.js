import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const HomeHero = ({
  name,
  jobTitle,
  location,
  profileImage,
  profileButton,
  blogButton,
  isPreview,
}) => {
  const hasPortrait =
    isPreview
      ? !!profileImage
      : !!profileImage &&
        !!profileImage.src &&
        !!profileImage.src.childImageSharp &&
        !!profileImage.src.childImageSharp.fluid

  const portraitSrc = isPreview
    ? profileImage
    : hasPortrait
    ? profileImage.src.childImageSharp.fluid.src
    : null

  const portraitAlt = profileImage && profileImage.alt ? profileImage.alt : name

  return (
    <section className={`sec-hero-home${hasPortrait ? '' : ' no-portrait'}`}>
      <div className="hero-inner">
        <div className="hero-text">
          {jobTitle && <span className="hero-eyebrow">{jobTitle}</span>}
          <h1 className="hero-name">{name}</h1>
          {location && <p className="hero-location">{location}</p>}
          <div className="hero-actions">
            {profileButton && profileButton.slug && (
              <Link
                to={isPreview ? profileButton.slug : profileButton.slug}
                className="btn-editorial"
              >
                {profileButton.label || 'View Profile'}
              </Link>
            )}
            {blogButton && blogButton.slug && (
              <Link
                to={isPreview ? blogButton.slug : blogButton.slug}
                className="btn-ghost"
              >
                {blogButton.label || 'Read Blog'}
              </Link>
            )}
          </div>
        </div>
        {hasPortrait && (
          <div className="hero-portrait">
            <div className="portrait-frame">
              <img src={portraitSrc} alt={portraitAlt} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

HomeHero.propTypes = {
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string,
  location: PropTypes.string,
  profileImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  profileButton: PropTypes.shape({
    label: PropTypes.string,
    slug: PropTypes.string,
  }),
  blogButton: PropTypes.shape({
    label: PropTypes.string,
    slug: PropTypes.string,
  }),
  isPreview: PropTypes.bool,
}

HomeHero.defaultProps = {
  isPreview: false,
}

export default HomeHero

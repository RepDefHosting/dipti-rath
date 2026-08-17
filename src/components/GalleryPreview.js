import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import SectionLabel from './SectionLabel'

const GalleryPreview = ({ items, label, isPreview }) => {
  if (!items || items.length === 0) return null

  const validItems = items
    .filter((item) => !!item && !!item.frontmatter)
    .slice(0, 6)

  if (validItems.length === 0) return null

  return (
    <section className="sec-gallery-preview">
      <div className="gallery-preview-inner">
        <div className="gallery-preview-header">
          {label && <SectionLabel>{label}</SectionLabel>}
          {!isPreview && (
            <Link to="/gallery/" className="gallery-preview-link">
              View all photos →
            </Link>
          )}
        </div>
        <ul className="gallery-preview-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {validItems.map((item, i) => {
            const { featuredImage, pageTitle } = item.frontmatter
            const slug = item.fields && item.fields.slug

            const imgSrc = isPreview
              ? featuredImage && featuredImage.src
              : featuredImage &&
                featuredImage.src &&
                featuredImage.src.childImageSharp &&
                featuredImage.src.childImageSharp.fluid &&
                featuredImage.src.childImageSharp.fluid.src

            const imgAlt = (featuredImage && featuredImage.alt) || pageTitle || ''

            return (
              <li key={i} className="gallery-preview-item">
                {isPreview || !slug ? (
                  <div>
                    {imgSrc && <img src={imgSrc} alt={imgAlt} loading="lazy" />}
                  </div>
                ) : (
                  <Link to={slug} aria-label={imgAlt}>
                    {imgSrc && <img src={imgSrc} alt={imgAlt} loading="lazy" />}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

GalleryPreview.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({ slug: PropTypes.string }),
      frontmatter: PropTypes.shape({
        pageTitle: PropTypes.string,
        featuredImage: PropTypes.shape({
          src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
          alt: PropTypes.string,
        }),
      }),
    }),
  ),
  label: PropTypes.string,
  isPreview: PropTypes.bool,
}

GalleryPreview.defaultProps = {
  isPreview: false,
}

export default GalleryPreview

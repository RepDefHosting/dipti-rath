import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout, PhotoFeed } from '../components'
import { postPropTypes } from '../components/PhotoCard'
import { featuredImagePropTypes } from '../proptypes'
import { seoProps, getValidDates, addTrailingSlash } from '../utils'
import Banner from '../components/Banner'
import { useSiteData } from '../hooks'

export const GalleryArchiveTemplate = ({
  profileImage,
  name,
  header,
  subheader,
  posts,
  featuredImage,
  isPreview,
  profileButton,
  blogButton
}) => {
  const featuredImageSrc = isPreview ? featuredImage.src : !!featuredImage && !!featuredImage.d && !!featuredImage.d.childImageSharp && !!featuredImage.d.childImageSharp.fluid && !!featuredImage.d.childImageSharp.fluid.src ? featuredImage.d.childImageSharp.fluid.src : '/img/pic-executive-banner-blog-01.webp'

  return (
    <Fragment>
      <section className="sec-hero-sml">
        {/* Pass empty header to Banner so it doesn't emit an h1 — we render one below */}
        <Banner
          header=""
          subheader={''}
          imageSrc={featuredImageSrc}
          imageAlt={!!featuredImage && !!featuredImage.alt ? featuredImage.alt : header}
          profileImage={!!profileImage ? profileImage : null}
        />
      </section>

      <section className="sec-picture-list">
        <div className="pg-width">
          <div className="content">
            {/* SEO: single h1 with person's name for Google image pack */}
            <h1 className="gallery-archive-title">
              {name ? `${name} — Gallery` : header || 'Gallery'}
            </h1>
            <div className="all-pics">
              <PhotoFeed isPreview={isPreview} posts={posts} />
            </div>
            <div className="btn-row">
              {!!profileButton && (
                <Link className="btn-primary" to={addTrailingSlash(profileButton.link)}>
                  {profileButton.label}
                </Link>
              )}
              {!!blogButton && (
                <Link className="btn-primary" to={addTrailingSlash(blogButton.link)}>
                  {blogButton.label}
                </Link>
              )}
              <Link className="btn-primary" to="/">← Home</Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

const GalleryArchive = ({ data }) => {
  const { profileImage, name } = useSiteData()
  const { header, subheader, featuredImage, profileButton, blogButton } = data.markdownRemark.frontmatter
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    const {
      frontmatter: { featuredImage, pageTitle, date: userDate, teaser },
      fields: { slug, gitAuthorTime, gitCreatedTime },
    } = node
    const { date } = getValidDates(userDate, gitAuthorTime, gitCreatedTime)
    return {
      image: !!featuredImage ? featuredImage : null,
      slug,
      pageTitle,
      date,
      teaser,
    }
  })
  const pageProps = {
    profileImage,
    name,
    header,
    subheader,
    featuredImage,
    posts,
    profileButton,
    blogButton
  }

  return (
    <Layout seoProps={seoProps(data)}>
      <GalleryArchiveTemplate {...pageProps} />
    </Layout>
  )
}

GalleryArchiveTemplate.propTypes = {
  profileImage: PropTypes.object,
  name: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape(postPropTypes)),
  featuredImage: featuredImagePropTypes,
  isPreview: PropTypes.bool,
  profileButton: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
}

export default GalleryArchive

export const pageQuery = graphql`
  query GalleryArchiveTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "gallery-archive" } }) {
      fields {
        slug
        gitAuthorTime
        gitCreatedTime
      }
      frontmatter {
        templateKey
        pageTitle
        metaDescription
        schemaType
        header
        subheader
        profileButton {
          link
          label
        }
        blogButton {
          link
          label
        }
        featuredImage {
          src {
            childImageSharp {
              fluid {
                originalName
              }
              original {
                height
                width
              }
            }
          }
          d: src {
            childImageSharp {
              fluid(maxWidth: 1440, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          m: src {
            childImageSharp {
              fluid(maxWidth: 720, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          square: src {
            childImageSharp {
              fluid(maxWidth: 270, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
              original {
                height
                width
              }
            }
          }
          alt
          caption
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "gallery-post" }
          published: { eq: true }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
            gitAuthorTime
            gitCreatedTime
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            pageTitle
            teaser
            featuredImage {
              src {
                childImageSharp {
                  fluid {
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              m: src {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 100, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              d: src {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 100, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              square: src {
                childImageSharp {
                  fluid(maxWidth: 270, maxHeight: 270, quality: 100, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_withWebp
                    originalName
                  }
                  original {
                    height
                    width
                  }
                }
              }
              alt
              caption
            }
          }
        }
      }
    }
  }
`

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styles from "./certifications.module.css"

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const Certifications = () => {
  const data = useStaticQuery(graphql`
      query {
          allCertificationsJson {
              edges {
                  node {
                      issuer
                      issuerLink
                      image
                      imageAlt
                      title
                  }
              }
          }
          allFile(
              filter: {
                  extension: { eq: "svg" },
                  relativeDirectory: { eq: "technologies" }
              }
          ) {
              edges {
                  node {
                      publicURL
                      base
                  }
              }
          }
      }
  `)

  let certifications = data.allCertificationsJson.edges.map((e) => e.node);
  const images = data.allFile.edges.map((e) => e.node)

  // Map images to generated files
  certifications = certifications
    .map(c => {
      const match = images.filter(i => i.base === c.image);
      return {
        ...c,
        image: (match && match.length) ? match[0].publicURL : undefined,
      }
    });

  // Group by issuer
  certifications = groupBy(certifications, `issuer`);
  const issuers = Object.keys(certifications);

  return (
    <div className={styles.certsShowcaseSection}>
      {certifications && issuers.map((issuer) => (
        <div key={issuer}>
          <div style={{ textAlign: 'center' }}>
            <OutboundLink
              href={certifications[issuer][0].issuerLink}
              key={issuer}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ maxHeight: '100px', padding: '0 40px', width: '200px' }}
                src={certifications[issuer][0].image}
                alt={certifications[issuer][0].imageAlt}
              />
            </OutboundLink>
          </div>
          <div className={styles.logos}>
            {certifications[issuer] && certifications[issuer].map((cert) => (
              <div style={{ maxHeight: '150px', padding: '20px 40px', maxWidth: '300px', wordBreak: 'keep-all' }}>
                {cert.title}
              </div>
            ))}
          </div>
          <hr style={{ marginBottom: '40px' }} />
        </div>
      ))}
    </div>
  )
}

export default Certifications;

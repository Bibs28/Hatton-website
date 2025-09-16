// import { jsx, useColorMode } from "theme-ui"
import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import styles from "./technologies.module.css"


const Technologies = ({ showAll = false }) => {
  // const [colorMode] = useColorMode()

  const data = useStaticQuery(graphql`
      query {
          allTechnologiesJson {
              edges {
                  node {
                      caption
                      image
                      imageAlt
                      infoLink
                      pinned
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

  const tech = data.allTechnologiesJson.edges.map((e) => e.node)
  const images = data.allFile.edges.map((e) => e.node)

  const showcase = tech
    .filter(t => showAll ? true : t.pinned)
    .map(t => {
      const match = images.filter(i => i.base === t.image);
      return {
      ...t,
        image: (match && match.length) ? match[0].publicURL : undefined,
      }
    })
    .map(t => (
      <OutboundLink href={t.infoLink} key={t.infoLink} target="_blank" rel="noopener noreferrer">
        <img src={t.image} alt={t.imageAlt} title={t.imageAlt}/>
      </OutboundLink>
    ))

  // sx={{ backgroundColor: colorMode === `dark` ? 'text' : 'background' }}
  return (
    <div className={styles.productShowcaseSection}>
      {/*<Styled.h2>Market Experience</Styled.h2>*/}
      {/*<Styled.p>Clients our consultants have worked with</Styled.p>*/}
      <div className={styles.logos}>{showcase}</div>
      {!showAll && <div className={styles.moreUsers}>
        <Link to={"/technologies"}>
          More Technologies
        </Link>
      </div>}
    </div>
  )
}

export default Technologies;

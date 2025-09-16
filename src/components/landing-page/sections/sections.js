/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"

import GridBlock from "../../grid-block/grid-block"


const Sections = () => {
  const [colorMode] = useColorMode()

  const data = useStaticQuery(graphql`
      query {
          allSectionsJson {
              edges {
                  node {
                      title
                      image
                      imageAlt
                      text
                      checkMarks
                      contentRight
                  }
              }
          }
          allFile(
              filter: {
                  extension: { eq: "svg" },
                  relativeDirectory: { eq: "sections" }
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

  const sections = data.allSectionsJson.edges.map((e) => e.node)
  const images = data.allFile.edges.map((e) => e.node)
  const getImageURL = (fileName) => {
    const result = images.filter(i => i.base === fileName)
    return result.length ? result[0].publicURL : "bad-filename"
  }

  const backgroundColor = (i) => i % 2
    ? 'background'                                          // no change for even sections
    : (colorMode === `light` || undefined ? '#f7f7f7' : 'background');   // odd sections get a darker gray color on light theme

  return (
    sections && sections.map((section, i) =>
      <div
        key={section.title}
        className={`container paddingTop paddingBottom`}
        sx={{ backgroundColor: backgroundColor(i) }}
      >
        <div className="wrapper">
          <GridBlock
            align={"left"}
            contents={[{
              title: section.title,
              content: section.text
                ? <Styled.p style={{ fontSize: '.9em', wordBreak: 'keep-all' }}>
                      {section.text}
                  </Styled.p>
                : (
                  <span>
                    <div className="checkmarks">
                      <ul>{section.checkMarks.map((point) => (
                        <li key={point} style={{ fontSize: '.9em', wordBreak: 'keep-all' }}>
                          {point}
                        </li>
                      ))}</ul>
                    </div>
                  </span>
                ),
              image: getImageURL(section.image),
              imageAlt: section.imageAlt,
              imageAlign: section.contentRight ? "left" : "right",
            }]}
            blockStyle={{ marginBottom: 0 }}
            layout={undefined}
          />
        </div>
      </div>,
    ))
}

export default Sections

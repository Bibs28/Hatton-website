/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import GridBlock from "../../grid-block/grid-block"
// import Img from "gatsby-image"


const Features = () => {
  const data = useStaticQuery(graphql`
      query {
          allFeaturesJson {
              edges {
                  node {
                      title
                      image
                      imageAlt
                      text
                  }
              }
          }
          allFile(
              filter: {
                  extension: { eq: "svg" },
                  relativeDirectory: { eq: "features" }
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

  const features = data.allFeaturesJson.edges.map((e) => e.node)
  const images = data.allFile.edges.map((e) => e.node)
  const getImageURL = (fileName) => {
    const result = images.filter(i => i.base === fileName)
    return result.length ? result[0].publicURL : "bad-filename"
  }

  const backgroundColor = `darkBlue`;
  const color = `white`;

  return features && (
    <div
      className={`container paddingTop paddingBottom`}
      sx={{ backgroundColor, color }}
    >
      <div className="wrapper">
        <GridBlock
          align={"center"}
          contents={
            features.map((feature) => ({
              title: feature.title,
              content: <span><p>{feature.text}</p></span>,
              image: getImageURL(feature.image),
              imageAlt: feature.imageAlt,
              imageAlign: "top",
            }))
          }
          layout="threeColumn"
        />
      </div>
    </div>
  )
}

export default Features

/** @jsx jsx */
import { jsx } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import GridBlock from "../../grid-block/grid-block"
// import Img from "gatsby-image"

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const People = () => {
  const data = useStaticQuery(graphql`
      query {
          allPeopleJson {
              edges {
                  node {
                      name
                      image
                      imageAlt
                      imageLink
                      position
                      role
                  }
              }
          }
          allFile(
              filter: {
                  extension: { regex: "/(png|jpg)/" },
                  relativeDirectory: { eq: "team" }
              }
          ) {
              edges {
                  node {
                      base
                      childImageSharp {
                          fluid {
                              ...GatsbyImageSharpFluid_tracedSVG
                          }
                      }
                  }
              }
          }
      }
  `)

  let people = data.allPeopleJson.edges.map((e) => e.node);
  people = groupBy(people, `role`);
  const images = data.allFile.edges.map((e) => e.node)
  const getImage = (fileName) => {
    const placeholder = images.filter(i => i.base === `placeholder.png`);
    const result = images.filter(i => i.base === fileName)
    return result.length
      ? result[0].childImageSharp.fluid
      : (placeholder.length ? placeholder[0].childImageSharp.fluid : undefined)
  }

  // Main roles show up first, random roles show up afterwards,
  // sorted in alphabetical order
  const mainRoles = [`Consultants`, `Sales`, `Marketing`, `Outside Collaborators`];
  const roles = Object.keys(people)
    .filter((role) => mainRoles.indexOf(role) === -1)
    .sort()
  const allRoles = mainRoles.concat(roles);

  // Render component
  return people && allRoles.map((role) => {
    return people[role] && people[role].length && (
      <div key={role}>
        <h1 style={{ textAlign: 'center' }}>{role}</h1>
        <hr/>
        <div className={`container paddingTop paddingBottom`}>
          <div className="wrapper">
            <GridBlock
              align={"center"}
              contents={
                people[role].map((person, i) => ({
                  id: i,
                  title: person.name,
                  content: <span><p>{person.position}</p></span>,
                  image: getImage(person.image),
                  imageAlt: person.imageAlt,
                  imageLink: person.imageLink,
                  imageAlign: "top",
                }))
              }
              useGatsbyImg={true}
              imgContainerStyle={{ maxWidth: `150px`, marginBottom: 0 }}
              imgStyle={{ borderRadius: `50%` }}
              layout="threeColumn"
            />
          </div>
        </div>
      </div>
    )
  })
}

export default People

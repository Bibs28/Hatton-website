/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Styled, css, Flex } from "theme-ui"
import BioContent from "./bio-content"

const Bio = ({ post }) => {
  const data = useStaticQuery(bioQuery)
  const { avatar } = data

  return (
    <Flex css={css({ mb: 4, alignItems: `center` })}>
      {avatar ? (
        <Image
          fixed={avatar.childImageSharp.fixed}
          alt={post.author}
          css={css({
            mr: 2,
            mb: 0,
            width: 48,
            minWidth: 48,
            borderRadius: 99999,
          })}
        />
      ) : (
        <div
          css={css({
            mr: 2,
            mb: 0,
            width: 48,
            minWidth: 48,
            borderRadius: 99999,
          })}
          role="presentation"
        />
      )}
      <Styled.div>
        <BioContent author={post.author} />
      </Styled.div>
    </Flex>
  )
}

const bioQuery = graphql`
    query {
        avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
            childImageSharp {
                fixed(width: 48, height: 48) {
                    ...GatsbyImageSharpFixed_tracedSVG
                }
            }
        }
    }
`

export default Bio

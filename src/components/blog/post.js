import React from "react"
import { Styled, css } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layout/layout"
import SEO from "../seo"
import Container from "../layout/container/container"
import PostFooter from "./post-footer"

export default ({ location, data }) => {
  const {
    blogPost: post,
    previous, next,
    site: { siteMetadata: { title } },
  } = data

  return (
    <Layout location={location} title={title}>
      <SEO title={post.title} description={post.excerpt} author={post.author}/>
      <Container>
        <Styled.h1>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -3,
            mb: 3,
          })}
        >
          {post.date}
        </Styled.p>
        <MDXRenderer>{post.body}</MDXRenderer>
        <PostFooter {...{ post, previous, next }} />
      </Container>
    </Layout>
  )
}

const fs = require(`fs`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { urlResolve, createContentDigest } = require(`gatsby-core-utils`)
const { assetPath, blogBasePath, postsPath } = require(`./src/utils/default-options`)

// These templates are simply data-fetching wrappers that import components
const PostTemplate = require.resolve(`./src/templates/post-query`)
const PostsTemplate = require.resolve(`./src/templates/posts-query`)

/**
 * @description GraphQL resolver helper for MDX.
 * @param fieldName
 * @returns {function(*, *=, *=, *): any}
 */
const mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
  const resolver = type.getFields()[fieldName].resolve
  return await resolver(mdxNode, args, context, { fieldName })
}

/**
 * @description Extract slug from Front Matter or File Path.
 * @param node
 * @param getNode
 * @param fileNode
 * @param basePath
 * @param contentPath
 * @returns {string | {type: string}}
 */
const generateSlug = (node, getNode, fileNode, basePath, contentPath) => {
  let slug

  if (node.frontmatter.slug) {
    slug = path.isAbsolute(node.frontmatter.slug)
      ? node.frontmatter.slug                         // absolute paths take precedence
      : urlResolve(basePath, node.frontmatter.slug)  // otherwise a relative slug gets turned into a sub path
  } else {
    // otherwise use the filepath function from gatsby-source-filesystem
    const filePath = createFilePath({
      node: fileNode,
      getNode,
      basePath: contentPath,
    })
    slug = urlResolve(basePath, filePath)
  }

  return slug
}

// TODO: Merge locally with
//  https://www.gatsbyjs.org/packages/@codebrahma/gatsby-theme-blog/

// -----------------------------------------------------------------------------
// 1. Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store/*, reporter*/ }) => {
  const { program } = store.getState()

  const dirs = [
    path.join(program.directory, postsPath),
    path.join(program.directory, assetPath),
  ]

  dirs.forEach(dir => {
    // reporter.info(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    } else {
    }
  })
}

// 2. Customize schema for blog posts (define the event type)
exports.createSchemaCustomization = ({ actions: { createTypes }, schema }) => {
  // BlogPost Node Interface
  createTypes(`interface BlogPost @nodeInterface {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      keywords: [String]!
      excerpt: String!
  }`)

  // Not sure why we build this type from the interface
  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!` },
        body: { type: `String!`, resolve: mdxResolverPassthrough(`body`) },
        slug: { type: `String!` },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        keywords: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: { type: `Int`, defaultValue: 140 },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },

      },
      interfaces: [`Node`, `BlogPost`],
    }),
  )
}

// 3. Create slug from file name & new MdxBlogPost node from Mdx node
exports.onCreateNode = async ({ node, actions, getNode, createNodeId }) => {
  const { createNode, createParentChildLink } = actions

  // Type can be:
  //  - Directory, File, ImageSharp, Mdx, Site, SitePage, SitePlugin
  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to postsPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === postsPath) {
    const slug = generateSlug(node, getNode, fileNode, blogBasePath, postsPath)
      .replace(/\/*$/, `/`)   // normalize use of trailing slash

    // Not sure why bother with all this below?
    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
    }
    const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`)
    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxBlogPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxBlogPost`,
        contentDigest: createContentDigest(fieldData),    // MD5 hash
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) })
  }
}

// 4. Query slug & dynamically generate pages
exports.createPages = async ({ graphql, actions: { createPage }, reporter }, themeOptions) => {
  // Query blog posts with slugs
  const result = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Posts and Post pages.
  const { allBlogPost } = result.data
  const posts = allBlogPost.edges

  // Create the Posts page
  createPage({
    path: blogBasePath,
    component: PostsTemplate,
    context: {},
  })

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post

    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })
}

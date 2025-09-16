const { assetPath, dataPath, postsPath, mdx } = require(`./src/utils/default-options`)
const siteMetadata = require("./content/data/siteMetadata")

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.hattonenterprisesolutions.uk',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,

  // Custom vars
  PATH_PREFIX,
  GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

// GATSBY_GOOGLE_ANALYTICS_TRACKING_ID needs to be set in Netlify Environment
let GATrackingId = GATSBY_GOOGLE_ANALYTICS_TRACKING_ID;
if (GATrackingId && GATrackingId.trim() !== '') {
  GATrackingId = GATrackingId.trim();
  console.log('----------------------------- [GATSBY-CONFIG] GA TRACKING ID PROVIDED ----------------------------- ');
} else {
  console.log('----------------------------- [GATSBY-CONFIG] GA TRACKING ID NOT PROVIDED ----------------------------- ');
}

// Netlify functions - local dev
// https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying

module.exports = {
  // Not sure what this does
  pathPrefix: PATH_PREFIX || '/',
  // Customize your site metadata:
  siteMetadata: {
    ...siteMetadata,
    // Used for SEO (sitemap & robots.txt)
    siteUrl,
    // Site footer
    copyright: siteMetadata.copyright.replace("{YEAR}", new Date().getFullYear()),
  },

  // Plugins
  plugins: [
    // Analytics
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          cookieName: `gatsby-gdpr-google-analytics`,
          trackingId: GATrackingId,
          // // Defines where to place the tracking script - `true` in the head and `false` in the body
          // head: false,
          // // IP anonymize is required in Germany
          // anonymize: true,
          // // Setting this parameter is also optional
          // respectDNT: true,
          // // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
          // // Useful when using page transitions (gatsby-plugin-transition-link)
          // pageTransitionDelay: 0,
          // // Google Optimize for A/B testing
          // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
          // // SERVER_SIDE Google Optimize experiment
          // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
          // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
          // // Any additional optional fields
          // // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/#optional-fields
          // // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#create
          // sampleRate: 5,
          // siteSpeedSampleRate: 10,
          // cookieDomain: "example.com",
        },
        // Not used yet, further work required to integrate this.
        // See https://www.npmjs.com/package/react-cookie-consent#props
        // facebookPixel: {
        //   cookieName: `gatsby-gdpr-facebook-pixel`,
        //   pixelId: 'YOUR_FACEBOOK_PIXEL_ID'
        // },
        // This is default, here just to be explicit
        environments: ['production'],
      },
    },
    // This enables more advanced marketing campaigns
    // `gatsby-plugin-google-tagmanager`,
    // Analytics using Segment.com
    // `gatsby-plugin-segment-js`,

    mdx && {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/components/layout/layoutWithContainer.js`),
        },
        // Gatsby-specific remark plugins
        gatsbyRemarkPlugins: [
          // Processes images in markdown so they can be used in the production build.
          // It makes images responsive by:
          //   - Adding an elastic container to hold the size of the image while it loads to avoid
          //     layout jumps
          //   - Generating multiple versions of images at different widths and sets the srcset and
          //     sizes of the img element so regardless of the width of the device, the correct
          //     image is downloaded
          //   - Using the “blur up” technique popularized by Medium and Facebook where a small 20px
          //     wide version of the image is shown as a placeholder until the actual image is downloaded
          {
            resolve: `gatsby-remark-images`, // JPEG & PNG images
            // https://www.gatsbyjs.org/packages/gatsby-remark-images/?=gatsby-remark-images#options
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1240,               // default is 650
              quality: 80,                  // save on size
              linkImagesToOriginal: false,  // don't want to keep original image
              tracedSVG: true,              // use traced SVG instead of "blur up" effect
            },
          },
          // Copies local files linked to/from Markdown (.md|.markdown) files
          // to the root directory (i.e., public folder)
          { resolve: `gatsby-remark-copy-linked-files` },
          // Replaces “dumb” punctuation marks with “smart” punctuation marks using
          // the `retext-smartypants` plugin.
          { resolve: `gatsby-remark-smartypants` },
          // Wraps iframes or objects (e.g. embedded YouTube videos) within markdown files
          // in a responsive elastic container with a fixed aspect ratio. This ensures that
          // the iframe or object will scale proportionally and to the full width of its container.
          { resolve: `gatsby-remark-responsive-iframe` },
          { resolve: `gatsby-remark-code-titles` }  // see posts/hello-world.mdx
          // Potential:
          //  CODE:
          //    - gatsby-remark-embed-snippet (embed external code snippets from files)
          //    - gatsby-remark-prismjs (syntax highlighting to code blocks in markdown)
          //    - gatsby-remark-vscode (syntax highlighting to code blocks in markdown)
          // EXTERNAL CONTENT:
          //    - gatsby-remark-embed-video (youtube, vimeo, twitch)
          //    - gatsby-remark-embedder (CodePen, GIPHY, Instagram, SoundCloud, Twitter, YT, ...)
          // MISC:
          // See https://github.com/gatsbyjs/gatsby/issues/21150
          //    - gatsby-remark-reading-time
          //    - gatsby-remark-autolink-headers
          //    - gatsby-remark-social-cards
          //    - gatsby-remark-external-links
          //    - gatsby-plugin-guess-js
          //    - gatsby-source-google-analytics-reporting-api
          //    - gatsby-plugin-google-adsense
          //    - gatsby-plugin-react-leaflet
          //    - gatsby-plugin-mailchimp
          //    - gatsby-plugin-gdpr-cookies (@palmabit/react-cookie-law, react-cookie-consent)
          //    - gatsby-plugin-lodash
          //    - gatsby-plugin-nprogress
          //    - gatsby-plugin-catch-links
          //    - gatsby-plugin-twitter
          //    - gatsby-plugin-lunr
          //    - gatsby-plugin-favicon
          //    - gatsby-plugin-netlify
        ],
        // Remark (MD) plugins
        // https://github.com/remarkjs/remark/blob/master/doc/plugins.md#list-of-plugins
        remarkPlugins: [
          // Add anchors to headings using GitHub’s algorithm
          require(`remark-slug`),
          // Open external links in new tab & add `rel` attributes
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
          require(`remark-external-links`),
          // Generate Table Of Contents
          require(`remark-toc`),
          // Potential:
          //  - remark-collapse (collapsible sections)
        ],
        // Rehype (HAST) plugins
        rehypePlugins: [
          // https://github.com/rehypejs/rehype/blob/master/doc/plugins.md#list-of-plugins
        ],
      },
    },

    // Blog Posts
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: postsPath,
        name: postsPath,
      },
    },

    // Data
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: dataPath,
        name: dataPath,
      },
    },

    // Assets (post images)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: assetPath,
        name: assetPath,
      },
    },

    // Assets (page images)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // SEO
    `gatsby-plugin-react-helmet`,
    // TODO: Find a way to compute & update lastModifiedDate
    // See https://www.youtube.com/watch?v=LPo1TkU0vQs
    // TODO: Add structured data either in sitemap or
    //       in SEO react component.
    // See https://developers.google.com/custom-search/docs/structured_data
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }]
          },
          // Disable crawlers for deploy-previews
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    },

    // Blog RSS
    // `gatsby-plugin-feed-mdx`,

    // Styling
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,

    // Animation
    `gatsby-plugin-transition-link`,

    // PWA
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hatton Enterprise Solutions`,
        short_name: `Hatton Solutions`,
        start_url: `/`,
        background_color: `#005b9f`,
        theme_color: `#005b9f`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/hatton-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/`,
          `/team`,
          `/contact-us`,
          `/404`,
          `/blog/*`,
          `/services/*`,
        ],
      },
    },
  ].filter(Boolean),
}

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  switch (node.internal.type) {

    case 'IndexJson':
      const slug = createFilePath({ node, getNode, basePath: `pages` })
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
      break;
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allIndexJson {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
        result.data.allIndexJson.edges.map(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/home/index.js`),
            context: {
              slug: node.fields.slug,
            },
          })
        })
        resolve()
      })
  })
}
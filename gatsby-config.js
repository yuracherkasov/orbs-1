module.exports = {
  siteMetadata: {
    title: 'ORBS-BLOCKCHAIN FOR CONSUMER APPS',
  },
  pathPrefix: '/orbs',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
		},
    'gatsby-transformer-remark',
    `gatsby-transformer-json`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-responsive-iframe`,
				]
			}
		},
  ],
}
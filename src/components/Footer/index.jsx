import React from 'react'
import { withPrefix } from 'gatsby-link'

class Footer extends React.Component {
	render() {
		const pathPrefix =
			process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__
		return (
			<footer className="footer">
				<a className="footer-brand" href="#home">
					<img className="logo-img" src={pathPrefix + '/img/logo.png'} alt="" />
					<img className="logo-text" src={pathPrefix + '/img/logo_text.png'} alt="" />
				</a>
			</footer>

		)
	}
}

export default Footer
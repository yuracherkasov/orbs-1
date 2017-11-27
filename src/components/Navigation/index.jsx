import React from 'react'
import { withPrefix } from 'gatsby-link'
import Japan from './img/japan.svg'
import US from './img/us.svg'

class Navigation extends React.Component {
	componentWillMount() {
		this.state={
			isActiveMenu: false,
		}
	}
	toggleMenu = () => {
		this.setState({
			isActiveMenu: !this.state.isActiveMenu,
		})
	}
	render() {
		const pathPrefix =
			process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__
		return (
			<nav className="navbar">
				<ul className="navbar-langs">
					<li><a href="#"><img src={Japan} alt="" /></a></li>
					<li><a href="#"><img src={US} alt="" /></a></li>
				</ul>
				<button className="navbar-button" onClick={this.toggleMenu}>
					<span />
					<span />
					<span />
				</button>
				<a className="navbar-brand" href="#" onClick={e => e.preventDefault()}>
					<img className="logo-img" src={pathPrefix + '/img/logo.png'} alt="" />
					<img className="logo-text" src={pathPrefix + '/img/logo_text.png'} alt="" />
				</a>
				<ul className={`navbar-menu ${this.state.isActiveMenu ? 'active' : ''}`}>
					<li className="navbar-menu-item">
						<a href="#">About</a>
					</li>
					<li className="navbar-menu-item">
						<a href="#">Team</a>
					</li>
					<li className="navbar-menu-item">
						<a href="#">Academic paper</a>
					</li>
				</ul>
			</nav>

		)
	}
}

export default Navigation

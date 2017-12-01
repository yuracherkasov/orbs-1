import React from 'react'
import Japan from '../img/japan.svg'
import US from '../img/us.svg'
import Logo from '../img/logo.png'
import LogoText from '../img/logo_text.png'
import Link from 'gatsby-link'

class Navigation extends React.Component {
	constructor () {
		super();
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
		return (
			<nav className="navbar">
				<div className="navbar-container">			
					<ul className="navbar-langs">
						<li><Link to='/Japaneseweb/'><img src={Japan} alt="" /></Link></li>
						<li><Link to='/'><img src={US} alt="" /></Link></li>
					</ul>
					<button className="navbar-button" onClick={this.toggleMenu}>
						<span />
						<span />
						<span />
					</button>
					<a className="navbar-brand" href="#home">
						<img className="logo-img" src={Logo} alt="" />
						<img className="logo-text" src={LogoText} alt="" />
					</a>
					<ul className={`navbar-menu ${this.state.isActiveMenu ? 'active' : ''}`}>
						<li className="navbar-menu-item">
							<a href="#about">{this.props.menu[0] || `About`}</a>
						</li>
						<li className="navbar-menu-item">
							<a href="#team">{this.props.menu[1] || `Team`}</a>
						</li>
						<li className="navbar-menu-item">
							<a href="https://eprint.iacr.org/2016/1159.pdf">{this.props.menu[2] || `Academic paper`}</a>
						</li>
					</ul>
				</div>
			</nav>

		)
	}
}

export default Navigation

import React from 'react'
import Logo from '../img/logo.png'
import LogoText from '../img/logo_text.png'

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<a className="footer-brand" href="#home">
					<img className="logo-img" src={Logo} alt="" />
					<img className="logo-text" src={LogoText} alt="" />
				</a>
			</footer>

		)
	}
}

export default Footer
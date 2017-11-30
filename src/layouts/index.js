import React from "react"
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './styles.css'

export default class Template extends React.Component {
	constructor() {
		super();
		this.state = {
			nav: [],
		}
	}

	passDataToNav = (nav) => {
		this.setState({
			nav,
		})
	}
	render() {
		const passDataToNav = this.passDataToNav;
		return (
			<div className="wrapper">
				<Navigation menu={this.state.nav} />
					{this.props.children({ ...this.props, passDataToNav })}
				<Footer />
			</div>
		);
	}
}
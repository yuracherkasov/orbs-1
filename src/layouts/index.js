import React from "react"
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './styles.css'

export default class Template extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<Navigation />
					{this.props.children()}
				<Footer />
			</div>
		);
	}
}
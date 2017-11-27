import React from "react"
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './styles.css'

export default ({ children }) =>
<div className="wrapper">
  <Navigation />
	{children()}
	<Footer />
</div>
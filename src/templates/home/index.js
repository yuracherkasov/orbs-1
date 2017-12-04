import React from 'react'
import axios from 'axios'
import MediaQuery from 'react-responsive'
import { withPrefix } from 'gatsby-link'
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor'
import logoBlue from './img/logo_blue.png'
import Reddit from './img/reddit.png'
import Slack from './img/slack.png'
import Medium from './img/medium.png'
import Telegram from './img/telegram.png'
import Twitter from './img/twitter.png'
import styles from './index.module.css'

export default class Home extends React.Component{

	constructor(props) {
		super(props);
		this.placeholder = props.data.allIndexJson.edges[0].node.formPlaceholder;
		this.state={
			home: props.data.allIndexJson.edges[0].node,
			iframe: props.data.allMarkdownRemark.edges.filter(({ node }) => /(iframe.md)$/.test(node.fileAbsolutePath))[0],
			userEmail: this.placeholder,
			errorMessage: false,
			successMessage: false,
			CSSscale: 1,
		}
		this.props.passDataToNav(this.props.data.allIndexJson.edges[0].node.navigation);
		configureAnchors({ scrollDuration: 1500 });	
	}

	componentDidMount() {
		window.document.addEventListener('scroll', this.headingAnimationPlay);
  }

	headingAnimationPlay = () => {
		const height = 500;
		const offset = window.pageYOffset;
		if (offset < height) {
			const maxCSSscale = 1.25;
			const minCSSscale = 1;
			this.state.CSSscale < maxCSSscale
			? this.setState({
					CSSscale: minCSSscale + (offset / 2000),
				})
			: this.setState({
				CSSscale: maxCSSscale - (offset / 2000),
			})
		}
	}

	changeEmailField = (e) => {
		this.setState({
			userEmail: e.target.value,
		})
	}

	onFocusEmailField = () => {
		 if (this.state.userEmail === this.placeholder) {
			this.setState({
				userEmail: '',
			 })
		 }
	}

	onBlurEmailField = () => {
		if (this.state.userEmail === '') {
			this.setState({
				userEmail: this.placeholder,
			 })
		 }
	}

	makeSendEmail = (e) => {
		e.preventDefault();
		if (/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})?$/.test(this.state.userEmail)) {
			this.setState({
				errorMessage: false,
			})
			setTimeout(() => {
				this.setState({
					successMessage: true,
				})
			}, 1000)
			// axios.post(
			// 	'https://orbs.network/formsWriter.asmx',
			// 	{email: this.state.userEmail})
			// 	.then(response => {
			// 		console.log(response);
			// 	})
			// 	.catch(error => {
			// 		console.log(error);
			// 	})
		} else {
			this.setState({
				errorMessage: true,
			})
		}
	}

	render() {
		const {
			home,
			iframe,
			userEmail,
			errorMessage,
			successMessage,
			CSSscale,
		} = this.state;
		const pathPrefix = process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__;
			return (
				<div className={styles.home_content}>
					<ScrollableAnchor id={'home'}>
						<header className={styles.header}>
							<div className={styles.header_content}>
								<h1 className={styles.header_heading} style={{ transform: 'scale(' + CSSscale + ')'}}>{home.title}</h1>
								<p className={styles.header_text}>{home.subtitle}</p>
								<a
								href={pathPrefix + home.presentationUrl}
								target="_blank"
								className={styles.header_button}
								>{home.headerButton}</a>
							</div>
							<MediaQuery query="(min-width: 961px)">
								<div>
									<div className={styles.header_iframe} dangerouslySetInnerHTML={{ __html: iframe.node.html }} />
									<span className={`${styles.dot} ${styles.dot1}`} />
									<span className={`${styles.dot} ${styles.dot2}`} />
									<span className={`${styles.dot} ${styles.dot3}`} />
									<span className={`${styles.dot_blue} ${styles.dot4}`} />
								</div>
							</MediaQuery>	
							<MediaQuery query="(max-width: 960px)">
								<div className={styles.header_bg}>
									<span className={`${styles.dot} ${styles.dot5}`} />
								</div>
							</MediaQuery>						
						</header>
					</ScrollableAnchor>

					<ScrollableAnchor id={'about'}>
						<div className={styles.about}>
							<div className={styles.about_content}>
								<p className={styles.about_text}>
									{home.about}
								</p>
								<ul className={styles.about_icons}>
									<li>
										<a href="https://www.reddit.com/r/ORBS_Network/" target="_blank">
											<img width="40" height="40" src={Reddit} alt="ORBS Network on Reddit" />
										</a>
									</li>
									<li>
										<a href="https://orbs-network.slack.com/" target="_blank">
											<img width="40" height="40" src={Slack} alt="ORBS Network on Slack" />
										</a>
									</li>
									<li>
										<a href="https://medium.com/orbs-network" target="_blank">
											<img width="40" height="40" src={Medium} alt="ORBS Network on Medium" />
										</a>
									</li>
									<li>
										<a href="http://t.me/orbs_network" target="_blank">
											<img width="40" height="40" src={Telegram} alt="ORBS Network on Telegram" />
										</a>
									</li>
									<li>
										<a href="https://twitter.com/orbs_network" target="_blank">
											<img width="40" height="40" src={Twitter} alt="ORBS Network on Twitter" />
										</a>
									</li>
								</ul>

								<form className={`clearfix ${styles.subscribe_form}`}>
									<p className={styles.subscribe_text}>
										{home.formHeading}
									</p>

									{ successMessage
										? ( <div className={styles.subscribe_congratulation}>{home.formSuccess}</div>)
										: ( <div className={styles.subscribe_fields}>
												<input
													type="text"
													value={userEmail}
													onChange={this.changeEmailField}
													onFocus={this.onFocusEmailField}
													onBlur={this.onBlurEmailField}
												/>
												<button onClick={this.makeSendEmail}>{home.formButton}</button>
												{errorMessage ? (
													<div className={styles.subscribe_error}>
													{home.formError}
												</div>
												) : ''}
											</div>
										)
									}
									
								</form>
							</div>
							<span className={`${styles.dot} ${styles.dot6}`} />
						</div>
					</ScrollableAnchor>
					
					<ScrollableAnchor id={'team'}>
						<div className={styles.team}>
							<div className={styles.team_logo}>
								<img width="61" height="54" src={logoBlue} alt="" />
								<h2 className={styles.team_logo_text}>{home.teamHeading}</h2>
							</div>
							<ul className={styles.team_list}>

								{home.team.map((node, index) =>
									(<li key={index}>
										<div className={styles.member_image_wrap}>
											<div
												className={styles.member_image}
												style={{ backgroundImage: `url(${pathPrefix + node.image})` }}
											/>
										</div>
										<div className={styles.member_info}>
											<h4 className={styles.member_name}>{node.name}​</h4>
											<h6 className={styles.member_title}>{node.title}​</h6>
											<p className={styles.member_text}>{node.about}</p>
										</div>
									</li>
									)
								)}

							</ul>
						</div>
					</ScrollableAnchor>
				</div>
			)
	}
}

export const query = graphql`
query HomePageQuery($slug: String!) {
	allIndexJson (filter: { fields: { slug: { eq: $slug }} }) {
		edges {
			node {
				navigation
				title
				subtitle
				headerButton
				about
				formHeading
				formPlaceholder
				formButton
				formSuccess
				formError
				presentationUrl
				teamHeading
        team {
          image
          name
          title
          about
        }
			}
		}
	}
	allMarkdownRemark {
		totalCount
		edges {
			node {
				html
				fileAbsolutePath
			}
		}
	}
} 
`
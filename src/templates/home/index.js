import React from 'react'
import axios from 'axios'
import MediaQuery from 'react-responsive'
import { withPrefix } from 'gatsby-link'
import Constellation from './img/constellation.png'
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
		this.placeholder = props.data.allIndexJson.edges[0].node.formPlaceholder,
		this.state={
			home: props.data.allIndexJson.edges[0].node,
			iframe: props.data.allMarkdownRemark.edges.filter(({ node }) => /(iframe.md)$/.test(node.fileAbsolutePath))[0],
			userEmail: this.placeholder,
			errorMessage: false,
			successMessage: false,
		}
	}

	changeEmailField = (e) => {
		// console.log(e.target.value);
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
			}, 1500)
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
		} = this.state;
		const pathPrefix = process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__;
			return (
				<div>
					<header className={styles.header}>
					<div className={styles.header_content}>
							<h1 className={styles.header_heading}>{home.title}</h1>
							<p className={styles.header_text}>{home.subtitle}</p>
							<a
							href="https://s3.us-east-2.amazonaws.com/orbs-network-website/assets/en/orbs_presentation_en_1511863420.pdf"
							target="_blank"
							className={styles.header_button}
							>{home.headerButton}</a>
							<img width="103" height="85" className={styles.constellation} src={Constellation} alt="" />
						</div>
						<MediaQuery query="(min-width: 961px)">
							<div dangerouslySetInnerHTML={{ __html: iframe.node.html }} />
						</MediaQuery>	
						<MediaQuery query="(max-width: 960px)">
							<div className={styles.header_bg} />
						</MediaQuery>	
						
						
					</header>

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
					</div>

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
				</div>
			)
	}
}
export const query = graphql`
query HomePageQuery($slug: String!) {
	allIndexJson (filter: { fields: { slug: { eq: $slug }} }) {
		edges {
			node {
				id
				title
				subtitle
				headerButton
				about
				formHeading
				formPlaceholder
				formButton
				formSuccess
				formError
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
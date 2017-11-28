import React from "react"
import { withPrefix } from 'gatsby-link'
import Constellation from './img/constellation.png'
import logoBlue from './img/logo_blue.png'
import Reddit from './img/reddit.png'
import Slack from './img/slack.png'
import Medium from './img/medium.png'
import Telegram from './img/telegram.png'
import Twitter from './img/twitter.png'
import styles from './index.module.css'

export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		console.log(props);
		this.state = {
			iframe: props.data.allMarkdownRemark.edges.filter(({ node }) => /(iframe.md)$/.test(node.fileAbsolutePath))[0],
			team: props.data.allTeamsJson.edges[0].node,
			lang: 'US',
		}
	}

	render () {		
		const { iframe, team, lang } = this.state;
		const pathPrefix = process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__;
		return (
			<div>
				<header className={styles.header}>
					<div className={styles.header_content}>
						<h1 className={styles.header_heading}>CONSUMER GRADE BLOCKCHAIN</h1>
						<p className={styles.header_text}>INFRASTRUCTURE BUILT FOR REAL LIFE SCALE, COMPLIANCE AND UPDATES</p>
						<img width="103" height="85" className={styles.constellation} src={Constellation} alt="" />
					</div>
					<div dangerouslySetInnerHTML={{ __html: iframe.node.html }} />
				</header>

				<div className={styles.about}>
					<div className={styles.about_content}>
						<p className={styles.about_text}>
							ORBS IS A DECENTRALIZED BLOCKCHAIN INFRASTRUCTURE EMPOWERING MAINSTREAM CONSUMER
							APPLICATIONS TO TRANSITIONING INTO BLOCKCHAIN. ORBS PROVIDES A SCALABLE, COMPLIANT
							AND UPDATEABLE INFRASTRUCTURE. THE NEXT WAVE OF DECENTRALIZED BUSINESSES WILL BE
							BUILT BY TODAY’S BIGGEST CONSUMER BRANDS, USING ORBS.
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

						<form className={styles.subscribe_form}>
							<p className={styles.subscribe_text}>
								GET YOUR WEEKLY DOSE OF INNOVATION FROM US
							</p>
							<div className={styles.subscribe_fields}>
								<input type="text" />
								<button>Subscribe</button>
								<div className={styles.subscribe_error}>
									This Fields Is Required
								</div>
							</div>
						</form>
					</div>
				</div>

				<div className={styles.team}>
					<div className={styles.team_logo}>
						<img width="61" height="54" src={logoBlue} alt="" />
						<h2 className={styles.team_logo_text}>ORBS Team</h2>
					</div>

					<ul className={styles.team_list}>
						{team[lang].map((node, index) =>
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
query IndexQuery {
	allMarkdownRemark {
		totalCount
		edges {
			node {
				id
				html
				fileAbsolutePath
			}
		}
	}
	allTeamsJson {
		edges {
			node {
				id
				US {
					image
					name
					title
					about
				}
				Japan {
					image
					name
					title
					about
				}
			}
		}
	}
}
`
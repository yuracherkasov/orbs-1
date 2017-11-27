import React from 'react';
import favicon from './favicon.png';

let inlinedStyles = '';
if (process.env.NODE_ENV === 'production') {
  try {
    inlinedStyles = require('!raw-loader!../public/styles.css');
  } catch (e) {
    console.log(e);
  }
}

export default class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: inlinedStyles }}
        />
      );
    }
    return (

      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>ORBS-BLOCKCHAIN FOR CONSUMER APPS</title>
          {this.props.headComponents}
          <link rel="shortcut icon" href={favicon} />
					<link href="https://fonts.googleapis.com/css?family=Quicksand:400,700|Raleway:400,700" rel="stylesheet" />
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
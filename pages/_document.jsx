import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// Information for OG and Meta Tags
export const title = 'NextJS-Semantic-LESS';
const description = 'Site Description';
const url = `https://nextjs-semantic-less.now.sh`;
const thumbnail = `${url}/static/images/thumbnail.png`;
const themeColor = '#fff';
const seoKeywords = 'cool,site';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {/* Performance: Inject the page’s critical CSS in the <head> tag */}
          {this.props.styleTags}

          {/* Progressive Web App: Match the width of app’s content with width of viewport for mobile devices */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Progressive Web App: Have address bar match brand colors */}
          <meta name="theme-color" content={themeColor} />

          {/* Progressive Web App: Provide manifest file for metadata */}
          <link rel="manifest" href="./static/manifest.json" />

          {/* SEO: App description for search-engine optimization */}
          <meta name="Description" content={description} />

          {/* SEO: Search index and allow web crawlers to scrape the site */}
          <meta name="robots" content="index, follow" />

          {/* SEO: Search engine keywords */}
          <meta name="keywords" content={seoKeywords} />

          {/* Bonus: Have beautiful preview tiles when users share your website on social media */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={thumbnail} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={thumbnail} />

          {/* FavIcon: Display icon in browser title bar. */}
          <link
            rel="shortcut icon"
            href="static/images/favicon.ico"
            type="image/x-icon"
          />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

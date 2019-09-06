import React from 'react';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import { title } from './_document';
import 'fomantic-ui-less/semantic.less';

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>{title}</title>
        </Head>

        <Component {...pageProps} />
      </Container>
    );
  }
}

export default App;

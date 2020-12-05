import Head from "next/head";
import NProgress from "next-nprogress/component";
import "../styles/bootstrap.css";
import "../styles/antd.min.css";
import "../styles/custom.css";
import "../styles/style.css";

import React from "react";

const App = ({ Component, pageProps }) => (
  <div>
    <NProgress color="#D1BE6F" spinner />

    <Head>
      <title>DM</title>
    </Head>

    <Component {...pageProps} />
  </div>
);

export default App;

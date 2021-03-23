import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>TASI</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

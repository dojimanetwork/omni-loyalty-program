import Head from "next/head";
import { useSelector } from "react-redux";
import clsx from "clsx";

import Header from "components/header";
import Footer from "components/footer";
import Intro from "components/sections/intro";
import Slider from "components/slider";
import Feature from "components/sections/feature";
import GetStarted from "components/sections/get-started";
import Countbox from "components/countbox";
import CTA from "components/cta";
import EthRow from "components/eth-row";


import stl from "./Home.module.scss";

const Home = () => {

  const { isDark } = useSelector((state) => state.appearance);

  return (
    <div className={clsx(stl.wrapper, isDark && stl.dark)}>
      <Head>
        <title>Creating an Interoperable Loyalty Points System</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Header />
      <Intro />
      <EthRow />
      {/* <Slider type="large" /> */}
      <Feature />
      {/* <GetStarted /> */}
      <Feature
        title={
          <>
            Advantages of an
            <br /> Interoperable Loyalty
            <br /> Points System
          </>
        }
        description="This interoperable loyalty points system boosts consumer satisfaction by enabling seamless point exchanges, secure transactions and flexible reward options across multiple brands, increasing engagement and retention."
         src="/assets/png/market-nft.png"
        showKeyPoints
        swap
      />
      {/* <Slider /> */}
      {/* <Countbox /> */}
      <CTA />
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "1rem",
          justifyContent: "center",
          margin: "auto",
          alignItems: "center",
          padding: "1.5rem",
        }}
      >
        {[0, 0, 0, 0].map(() => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1.5rem",
              }}
            >
              <img src="https://nft-portfolio-landing-page.vercel.app/static/media/04.9cc409d85e430fe9f745.jpg"
                style={{
                  width: "300px",
                  height: "400px",
                  backgroundColor: "red",
                }}
              />

              <div style={{display:"flex",
                flexDirection:"column",
                rowGap:"0.5rem"
              }}>
                <h4>Bharath</h4>
                <p>Front-End Developer</p>
              </div>
            </div>
          );
        })}
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;

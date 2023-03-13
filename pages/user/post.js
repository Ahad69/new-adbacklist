import Footer from "@/component/Footer/footer";
import Header from "@/component/Header/header";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import style from "../../styles/login.module.css"

const Post = () => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Select Location</title>
      </Head>
      <Header></Header>
      <div className={style.div}>
        <h3 className={style.link}>
          <Link href={`/user/free-ads/`}>1. Post Free Ads</Link>
        </h3>
        <h3 className={style.link}>
          {" "}
          <Link href={`/user/local-ads/`}>2. Post Local Ads</Link>
        </h3>
        <h3 className={style.link}>
          {" "}
          <Link href={`/user/multiple-city-ads/`}>
            3. Post Ads in Multiple Cities
          </Link>
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Post;

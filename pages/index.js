import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import data from "../public/country.json";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ad Back List free classifieds </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <Image width={200} height={70} src="/logo.png" />
          <ul className={styles.menu}>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/registration">Registration</Link>
            </li>
          </ul>
        </div>
        {data?.map((c) => (
          <div className={styles.country} id={c.name}>
            <h1 className={styles.countryTitle}>{c.name}</h1>

            {c?.children?.map((a) => (
              <div id={a.name}>
                <h3 className={styles.stateName}>{a.name}</h3>
                <div className={styles.state}>
                  {a?.children?.map((b) => (
                    <Link
                      key={b.name}
                      href={`/${c.name}/${a.name}/${b.name}`}
                      className={styles.cityname}
                    >
                      {b.name}{" "}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}

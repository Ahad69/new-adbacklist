import Link from "next/link";
import React from "react";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <div className={style.container}>
      <ul className={style.footer}>
        <li className={style.item}>
          <Link href="/" className="link text-uppercase" title="Home">
            Home
          </Link>
        </li>
        <hr className={style.hr} />
        <li className={style.item}>
          <Link
            href="/about-us"
            className="link text-uppercase"
            title="About us"
          >
            About us
          </Link>
        </li>
        <hr  className={style.hr} />
        <li className={style.item}>
          <Link
            href={`/recharge-credits/`}
            className="link text-uppercase"
            title="Buy Credit"
          >
            Buy Credit
          </Link>
        </li>

        <hr  className={style.hr} />
        <li className={style.item}>
          <Link
            href="/contact-us"
            className="link text-uppercase"
            title="Contact"
          >
            Contact
          </Link>
        </li>
        <hr  className={style.hr} />
        <li className={style.item}>
          <Link
            href="/privacy-policy"
            className="link text-uppercase"
            title="Privacy"
          >
            Privacy
          </Link>
        </li>
        <hr  className={style.hr} />
        <li className={style.item}>
          <Link href="/terms" className="link text-uppercase" title="Terms">
            Terms
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

import Link from "next/link";
import React from "react";
import style from "./header.module.css";

const Header = ({ data }) => {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Link href={`/`}>
          <img className={style.image} src="/logo.png" />
        </Link>
        <button className={style.postButton}> + Add Post</button>
      </div>

      <div className={style.location}>
        <p>
          {data?.[2]}, {data?.[1]}, {data?.[0]}
        </p>
      </div>
    </div>
  );
};

export default Header;

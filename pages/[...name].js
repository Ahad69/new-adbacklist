import Footer from "@/component/Footer/footer";
import Header from "@/component/Header/header";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import category from "../public/category.json";
import style from "../styles/category.module.css";

const Category = () => {
  const router = useRouter();
  const id = router?.query?.name;

  return (
    <>
      <Header data={id} />

      <div className={style.container}>
        {category?.map((a) => (
          <div>
            <h2 className={style.cateTitlte}> {a.name} </h2>
            {a.children?.map((b) => (
              <ul className={style.subCategoryList}>
                <li>
                  <Link
                    href={`/post/${id?.[0]}/${id?.[1]}/${id?.[2]}/${a.name}/${b.name}`}
                  >
                    {" "}
                    {b.name}
                  </Link>{" "}
                </li>
              </ul>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Category;

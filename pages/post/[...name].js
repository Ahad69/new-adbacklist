import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "../../styles/postPage.module.css";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Cookies from "js-cookie";
import Footer from "@/component/Footer/footer";
import Header from "@/component/Header/header";

const initialState = {
  day1: [],
  day2: [],
  day3: [],
  day4: [],
  day5: [],
  day6: [],
  day7: [],
  lastWeek: [],
  day1time: "",
  day2time: "",
  day3time: "",
  day4time: "",
  day5time: "",
  day6time: "",
  day7time: "",
  lastWeekTime: "",
};

const Post = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  //   const { Sidebar, Headers } = Drawer(router.query);
  const [ads, setAds] = useState([]);
  const [post, setPost] = useState();
  const [error, setError] = useState("no error");
  const [freeCityPost, setFreeCityPost] = useState();
  const [premiumCityPost, setPremiumCityPost] = useState();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState("");
  const [searchPage, setsearchPage] = useState(1);
  const [page, setPage] = useState(1);

  async function getUser() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/all?page=${page}&category=${router?.query?.name?.[4]}`
      );

      const forcity = response.data.data.products?.filter(
        (a) =>
          a.city == router?.query?.name[2] ||
          a.cities.includes(router?.query?.name[2])
      );
      
      const cityPost = forcity?.filter(
        (a) => a?.subCategory == router?.query?.name[4]
      );
      console.log(cityPost);
      const day1time = new Date().toDateString();
      const day1 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day1time
      );

      const day2time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
      ).toDateString();
      const day2 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day2time
      );

      const day3time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 2
      ).toDateString();
      const day3 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day3time
      );

      const day4time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 3
      ).toDateString();
      const day4 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day4time
      );

      const day5time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 4
      ).toDateString();
      const day5 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day5time
      );

      const day6time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 5
      ).toDateString();
      const day6 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day6time
      );

      const day7time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 6
      ).toDateString();
      const day7 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day7time
      );

      const lastWeek = cityPost.filter(
        (a) =>
          new Date(a.updatedAt).toDateString() !== day7time &&
          new Date(a.updatedAt).toDateString() !== day1time &&
          new Date(a.updatedAt).toDateString() !== day2time &&
          new Date(a.updatedAt).toDateString() !== day3time &&
          new Date(a.updatedAt).toDateString() !== day4time &&
          new Date(a.updatedAt).toDateString() !== day5time &&
          new Date(a.updatedAt).toDateString() !== day6time
      );

      setState({
        ...state,
        day1: day1,
        day1time: day1time,
        day2: day2,
        day2time: day2time,
        day3: day3,
        day3time: day3time,
        day4: day4,
        day4time: day4time,
        day5: day5,
        day5time: day5time,
        day6: day6,
        day6time: day6time,
        day7: day7,
        day7time: day7time,
        lastWeek: lastWeek,
      });
      setPost(cityPost);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function getAds() {
    try {
      const response = await axios.get(`http://localhost:5000/api/sideads`);
      const data = response.data.ads;
      const category = data
        .filter((a) => a?.category == router?.query?.name?.[3])
        .slice(0, 4);
      setAds(category);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (!router?.query?.name) {
      return;
    } else {
      getUser();
      getAds();
    }
  }, [router?.query , page]);

  useEffect(() => {
    if (router?.query?.name) {
      const premiumPost = post?.filter((a) => a.isPremium == true);
      setPremiumCityPost(premiumPost);
      const freePost = post?.filter((a) => a.isPremium == false);

      setFreeCityPost(freePost);
    }
  }, [post, router?.query?.name, reload]);

const searchbypage = ()=>{
    setPage(searchPage)
}
  
  const setAdult = (e) => {
    Cookies.set("age", e);
    setReload(!reload);
  };

  useEffect(() => {
    const useOld = Cookies.get("age");
    setAge(useOld);
  }, [reload]);

  return (
    <div className={style.container}>
      <Head>
        <title> {router?.query?.name?.[4]} Posts</title>

        <link rel="icon" href="/logo.png" />
      </Head>
      <Header data={router?.query?.name} />

      {isLoading ? (
        <div className="m-10 sm:m-24">
          <img className="block m-auto" width={100} src="/logo.png" />
        </div>
      ) : (
        <>
          {router?.query?.name?.[3] == "Adult" && age == undefined ? (
            <div className={style.warning}>
              <h1 className={style.warningTitle}>Disclaimer</h1>
              <p className={style.warningText}>
                This section contains sexual containt.including pictorial nudity
                adult language. It is to be accessed only by persons who are 21
                years of age or older (and is not considered to be a minor in
                his/her state of residence) and who live in a community or local
                jurisdiction where nude pictures and explicit adult materials
                are not prohibited by law. By accessing this website, you are
                representing to us that you meet the above qualifications. a
                false representation may be a criminal offense. I confirm and
                represent that I am 21 years of age or older (and am not
                considered to be a minor in my state of residence) and that I am
                not located in a community or local jurisdiction where nude
                pictures or explicit adult materials are prohibited by any Law.
                I agree to report any illegal services or activities which
                violate the Terms of Use.I also agree to report suspected
                exploitation of minors and/or human trafficking to appropriate
                authorities.
              </p>
              <div>
                <button
                  className={style.adultAgreedButton}
                  onClick={() => setAdult("Adult")}
                >
                  I am over 21
                </button>
                <Link href={"/"}>
                  {" "}
                  <button className={style.adultDisgreedButton}>
                    {" "}
                    Exit{" "}
                  </button>{" "}
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className={style.mainContainer}>
                <div className={style.postContainer}>
                  <ul className={style.breadcrumbs}>
                    <li>
                      <Link href={`/`}>Home</Link>
                    </li>{" "}
                    &#62;
                    {router?.query?.name ? (
                      <>
                        {" "}
                        <li>
                          {" "}
                          <Link href={`/#${router?.query?.name[0]}`}>
                            {router?.query?.name[0]}
                          </Link>{" "}
                        </li>{" "}
                        &#62;
                        <li>
                          {" "}
                          <Link href={`/#${router?.query?.name[1]}`}>
                            {router?.query?.name[1]}
                          </Link>{" "}
                        </li>{" "}
                        &#62;
                        <li>
                          <Link
                            href={`/${router?.query?.name[0]}/${router?.query?.name[1]}/${router?.query?.name[2]}/`}
                          >
                            {router?.query?.name[2]}
                          </Link>
                        </li>{" "}
                        &#62;
                        <li>
                          <Link
                            href={`/${router?.query?.name[0]}/${router?.query?.name[1]}/${router?.query?.name[2]}/`}
                          >
                            {router?.query?.name[3]}
                          </Link>
                        </li>{" "}
                        &#62;
                        <li>{router?.query?.name[4]}</li>
                      </>
                    ) : (
                      "Loading"
                    )}
                  </ul>

                  {/* premium post  */}

                  {error == "no error" ? (
                    <>
                      <div>
                        {!premiumCityPost?.length == 0 && (
                          <h1 className={style.premiumpostTitle2}>
                            Premium Ads
                          </h1>
                        )}
                        <>
                          {!state.day1?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day1time}
                            </h1>
                          ) : (
                            ""
                          )}

                          {state.day1?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day2?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              {state.day2time}
                            </h1>
                          )}

                          {state.day2?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day3?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              {state.day3time}
                            </h1>
                          )}

                          {state.day3?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day4?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              {state.day4time}
                            </h1>
                          )}

                          {state.day4?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day5?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              {state.day5time}
                            </h1>
                          )}

                          {state.day5?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day6?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              {state.day6time}
                            </h1>
                          )}

                          {state.day6?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day7?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              {state.day7time}
                            </h1>
                          )}

                          {state.day7?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.lastWeek?.length == 0 && (
                            <h1 className={style.premiumpostTitle}>
                              Last Week
                            </h1>
                          )}

                          {state.lastWeek?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                      </div>

                      <div>
                        {!freeCityPost?.length == 0 && (
                          <h1 className={style.freepostTitle}>Free Post</h1>
                        )}

                        <>
                          {!state.day1?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day1time}
                            </h1>
                          )}

                          {state.day1?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day2?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day2time}
                            </h1>
                          )}

                          {state.day2?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day3?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day3time}
                            </h1>
                          )}

                          {state.day3?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day4?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day4time}
                            </h1>
                          )}

                          {state.day4?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day5?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day5time}
                            </h1>
                          )}

                          {state.day5?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day6?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day6time}
                            </h1>
                          )}

                          {state.day6?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day7?.length == 0 && (
                            <h1 className={style.freepostTitle2}>
                              {state.day7time}
                            </h1>
                          )}

                          {state.day7?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.lastWeek?.length == 0 && (
                            <h1 className={style.freepostTitle2}>Last Week</h1>
                          )}

                          {state.lastWeek?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <h1 className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-{" "}
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                      </div>
                    </>
                  ) : (
                    "No Post Found"
                  )}
                  <hr className={style.hr} />
                  <div className={style.paginate}>
                    <button onClick={()=>setPage(1)}>1</button>
                    <button onClick={()=>setPage(2)}>2</button>
                    <button onClick={()=>setPage(3)}>3</button>
                    <button onClick={()=>setPage(4)}>4</button>
                    <button onClick={()=>setPage(5)}>5</button>
                    <hr />
                    <div>
                      {" "}
                      <input
                        className={style.paginateSearch}
                        type="number"
                        placeholder="Page"
                        onChange={e=> setsearchPage(e.target.value)}
                        defaultValue={page}
                      ></input>
                      <button onClick={()=>searchbypage()}>Search</button>
                    </div>
                  </div>
                </div>
                <div className={style.othersLink}>
                  {ads.map((a) => (
                    <div className={style.othersLinkContainer}>
                      <a href={`${a.link}`} target="_blank" rel="noreferrer">
                        <img
                          className={style.othersLinkImage}
                          src={`${a.image}`}
                        />
                        <p className="">{a.title}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Post;

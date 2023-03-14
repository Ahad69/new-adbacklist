import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import style from "../../../styles/login.module.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Header from "@/component/Header/header";
import Footer from "@/component/Footer/footer";

const initialState = {
  name: "",
  phone: "",
  email: "",
  category: "",
  subCategory: "",
  imgOne: "",
  imgTwo: "",
  imgThree: "",
  imgFour: "",
  city: "",
  month: "",
  cities: "",
  age: "",
  posterId: "",
  isPremium: false,
  error: "",
};



const Post = () => {
  const router = useRouter();

  const [state, setState] = useState(initialState);
  const [isLoadingS, setIsLoadingimgS] = useState(false);

  const [category, setCategory] = useState([]);

  const usersStringfy = Cookies.get("token");

  useEffect(() => {
    fetch(`/category.json`)
      .then((res) => res.json())
      .then((data) => setCategory(data));

    const user = jwt_decode(usersStringfy);
    setState({ ...state, posterId: user?._id });
  }, []);

  const dispatch = (e) => {
    setState({ ...state, [e.type]: e.payload });
  };

  const subCategoryLists = category.find((cate) => cate.name == state.category);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  // https://api.adbacklist.com/api/
  // // image upload handler
//https://api.adbacklist.com/api/


  const imgUpload = async (e) => {
    let data = { ...state };
    
    {
      fileList?.map((a, index) => {
        setIsLoadingimgS(true)
        const formData = new FormData();

        formData.append("images", a.originFileObj);

        fetch("https://api.adbacklist.com/api/image/upload-file", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {
            if (index == 0) {
              data["imgOne"] = result.payload.url;
              fileList.pop(a);
            }
            if (index == 1) {
              data["imgTwo"] = result.payload.url;
              fileList.pop(a);
            }
            if (index == 2) {
              data["imgThree"] = result.payload.url;
              fileList.pop(a);
            }
            if (index == 3) {
              data["imgFour"] = result.payload.url;
              fileList.pop(a);
            }

            if (fileList.length == 0) {
              data["month"] = month;

              if (
                data.category == "" ||
                data.description == "" ||
                data.email == "" ||
                data.phone == "" ||
                data.name == ""
              ) {
                setState({
                  ...state,
                  error: "All fields are required including an image",
                });
                return;
              } else {
                setState({ ...state, error: "" });
              }

              if (e[0] == "free-ads") {
                data["city"] = e[1];
              }

              if (e[0] == "local-ads" || e[0] == "multiple-city-ads") {
                data["city"] = e[1] || "";
                data["isPremium"] = true;
              }

              if (e[0] == "multiple-city-ads") {
                const items = JSON.parse(localStorage.getItem("cities"));

                data["cities"] = items;
              }

              fetch("https://api.adbacklist.com/api/products", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `Bearer ${usersStringfy}`,
                },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((data) => {
                  setIsLoadingimgS(false);
                  if (data.status == "success") {
                    Swal.fire({
                      position: "top-center",
                      icon: "success",
                      title: "Your work has been saved",
                      showConfirmButton: false,
                      timer: 2000,
                    }).then(
                      setTimeout(() => {
                        router.reload(window.location.pathname);
                      }, 2000)
                    );
                  }
                });
            }
          });
      });
    }
  };


  return (
    <div>
      <Head>
        <title>Post Ads</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header></Header>
      <div className="bg-gray-100 p-5">
        <div className="bg-white p-5 ">
          <h1 className="text-lg mb-5 text-black sm:text-2xl">
            {router?.query == undefined ? (
              <>
                Post Ad{" "}
                <span className="text-xs">({router?.query?.post?.[0]})</span>
              </>
            ) : (
              <>
                {" "}
                Post Ad{" "}
                <span className="text-xs">({router?.query?.post?.[0]})</span>
              </>
            )}
          </h1>
          <hr />
          <p className="text-black text-xs text-right">
            {" "}
            Maximum 4 images, max size 2MB each
          </p>
          <div>
            <div>
              <div className={style.imageContainer}>
        
              </div>
            </div>

            <div className={style.formDiv}>
              <label className="text-black font-bold text-xs sm:text-xl mb-5">
                Title :
                <br />
                <input
                  onChange={(e) =>
                    dispatch({ type: "name", payload: e.target.value })
                  }
                  type="text"
                  placeholder="Type here"
                  className="input bg-gray-50  input-bordered input-warning w-full "
                />
              </label>

              <label className="text-black font-bold text-xs sm:text-xl mb-5">
                Phone :
                <br />
                <input
                  type="number"
                  onChange={(e) =>
                    dispatch({ type: "phone", payload: e.target.value })
                  }
                  placeholder="Type here"
                  className="input bg-gray-50 input-bordered input-warning w-full "
                />
              </label>
              <label className="text-black font-bold text-xs sm:text-xl">
                Email :
                <br />
                <input
                  type="email"
                  onChange={(e) =>
                    dispatch({ type: "email", payload: e.target.value })
                  }
                  placeholder="Type here"
                  className="input bg-gray-50  input-bordered input-warning w-full "
                />
              </label>
              <label className="text-black font-bold text-xs sm:text-xl">
                Your Age :
                <br />
                <input
                  type="number"
                  onChange={(e) =>
                    dispatch({ type: "age", payload: e.target.value })
                  }
                  placeholder="Type here"
                  className="input bg-gray-50  input-bordered input-warning w-full "
                />
              </label>
            </div>
            <br />
            <div className={style.formDiv}>
              <label className="text-black font-bold text-xs sm:text-xl">
                Category :
                <br />
                <select
                  name="category"
                  id="category"
                  onChange={(e) =>
                    dispatch({ type: "category", payload: e.target.value })
                  }
                  className="input bg-gray-50  input-bordered input-warning w-full"
                >
                  <option value="category">-- Select Category --</option>

                  {category?.map((c) => (
                    <option value={c?.name}>{c?.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-black font-bold text-xs sm:text-xl">
                Sub Category :
                <br />
                <select
                  name="category"
                  id="category"
                  onChange={(e) =>
                    dispatch({ type: "subCategory", payload: e.target.value })
                  }
                  className="input bg-gray-50  input-bordered input-warning w-full "
                >
                  <option value="subCategory">-- Select Sub-Category --</option>

                  {subCategoryLists?.children?.map((c) => (
                    <option value={c?.name}>{c?.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="sm:w-2/4 w-full m-auto pt-10 ">
              <label className="text-black font-bold text-xs sm:text-xl">
                Description :
                <br />
                <textarea
                  onChange={(e) =>
                    dispatch({ type: "description", payload: e.target.value })
                  }
                  className="textarea textarea-warning h-48  w-full bg-gray-50"
                  placeholder="Description"
                ></textarea>
              </label>
            </div>
            {router?.query?.post?.[1] && (
              <div className="sm:w-2/4 w-full  m-auto pt-10 ">
                <label className="text-black font-bold text-xs sm:text-xl">
                  Selected Area :
                  <div className={style.locationLi}>
                    <li>{router?.query?.post?.[1]}</li>
                  </div>
                </label>
              </div>
            )}

            <p className="text-red-600 text-xs">{state.error}</p>
            <div className="sm:w-2/4 w-full m-auto pt-10 ">
              {isLoadingS ? (
                      <button
                      className={style.loginButton}
                      role="button"
                    >
                   Wait...
                    </button>
              ) : (
                <button
                  className={style.loginButton}
                  onClick={() => imgUpload(router?.query?.post)}
                  role="button"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Post;

import React, { useState } from "react";
import style from "../styles/login.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Head from "next/head";
import Footer from "@/component/Footer/footer";
import Header from "@/component/Header/header";

const initialState = {
  email: "",
  password: "",
  passError: "",
  emailError: "",
};

const Login = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = (e) => {
    setState({ ...state, [e.type]: e.payload });
  };

  const login = async () => {
    setIsLoading(true);
    const data = { ...state, isLoading: true };

    await axios
      .post("http://localhost:5000/api/users/login", data)

      .then((response) => {
       
        if (response.data.message == "success") {
          Cookies.set("token", response.data.token);
          setState({ ...state, emailError: "" });

          if (router?.asPath == "/login") {
            router.push(`/`);
          } else {
            setTimeout(() => {
              router.reload(router?.asPath);
            }, 500);
          }
          setIsLoading(false);
        } else {
          setState({ ...state, emailError: "Something went wrong" });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setState({ ...state, emailError: error.response.data.message });
      });
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Login</title>
      </Head>
     
      <div className={style.container}>
        <img
          alt="cityxdate"
          title="cityxdate"
          width={250}
          className="m-auto pb-5"
          src="/logo.png"
        />
        <h1 className="flex justify-center text-3xl font-bold mb-5">Login</h1>

        <div className={style.inputBox}>
         
          <input
            type="text"
            placeholder="Email"
            className={style.input}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
          />
        </div>
        <div className={style.inputBox}>
          <span>
         
          </span>
          <input
            type="password"
            placeholder="Password"
            className={style.input}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
          />
        </div>
        <p className={style.error}>{state.emailError}</p>
        <div className={style.inputBox}>
          {isLoading == true ? (
            <button className={style.loginButton}>
              Checking...
            </button>
          ) : (
            <button
              className={style.loginButton}
              onClick={login}
            >
              login
            </button>
          )}
        </div>
        {/* <img src="/upload.gif" /> */}
        <p className="text-2xl flex justify-center mt-5">
          New here ?{" "}
          <Link className="text-blue-600 underline" href={`/register`}>
            Register
          </Link>{" "}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

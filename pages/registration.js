import React, { useEffect, useState } from "react";
import style from "../styles/login.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Footer from "@/component/Footer/footer";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  month: "",
  password: "",
  isDelete: false,
  confirmPass: "",
  passError: "",
  emailError: "",
};

const Register = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = (e) => {
    setState({ ...state, [e.type]: e.payload });
  };

  useEffect(() => {
    if (state.password !== state.confirmPass) {
      setState({ ...state, passError: "Password didnt matched" });
    } else {
      setState({ ...state, passError: "" });
    }
  }, [state.confirmPass, state.password]);

  const register = async () => {
    setIsLoading(true);
    let data = { ...state };

    const date = new Date();
    const month = date.toLocaleString("default", { month: "short" });
    data["month"] = month;

    await axios
      .post("http://localhost:5000/api/users", data)
      .then((response) => {
        if (response.data.message == "success") {
          setIsLoading(false);
          router.push("/login");
        } else {
          setState({ ...state, emailError: "Something went wrong" });
        }
      })
      .catch((error) => {
        setState({ ...state, emailError: error.response.data.error });
      });
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Register</title>
      </Head>
      <div className={style.container}>
        <img
          alt="cityxdate"
          title="cityxdate"
          width={250}
          className="m-auto pb-5 "
          src="/logo.png"
        />
        <h1 className="flex justify-center text-3xl font-bold mb-5">
          Registration
        </h1>

        <div className={style.inputBox}>
          <span></span>
          <input
            type="text"
            placeholder="First Name"
            className={style.input}
            onChange={(e) =>
              dispatch({ type: "firstName", payload: e.target.value })
            }
          />
        </div>
        <div className={style.inputBox}>
          <span></span>
          <input
            type="text"
            placeholder="Last Name"
            className={style.input}
            onChange={(e) =>
              dispatch({ type: "lastName", payload: e.target.value })
            }
          />
        </div>
        <div className={style.inputBox}>
          <span></span>
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
          <span></span>
          <input
            type="password"
            placeholder="Password"
            className={style.input}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
          />
        </div>
        <div className={style.inputBox}>
          <span></span>
          <input
            type="password"
            placeholder="Confirm Password"
            className={style.input}
            onChange={(e) =>
              dispatch({ type: "confirmPass", payload: e.target.value })
            }
          />
        </div>
        <p className={style.error}>{state.passError}</p>
        <p className={style.error}>{state.emailError}</p>

        <div className={style.inputBox}>
          {isLoading == true ? (
            <button className={style.loginButton}>Creating...</button>
          ) : (
            <button className={style.loginButton} onClick={() => register()}>
              Register
            </button>
          )}
        </div>

        <p className={style.footer}>
          Already Registered ?{" "}
          <Link className="text-blue-600 underline" href={`/login`}>
            Login
          </Link>{" "}
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;

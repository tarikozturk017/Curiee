import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom, useSetAtom } from "jotai";
import { userTokenAtom } from "./Layout";
import Card from "./page/Card";
import Header from "./page/Header";
import config from "@/src/config";

import PopUp from "./page/PopUp";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const setUserToken = useSetAtom(userTokenAtom);

  //useSWR is more useful when we want to continuously fetch data from an API
  //endpoint and update our UI with the latest data. It provides an easy way to
  //handle caching, stale-while-revalidate, and other data-fetching-related features.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${config.apiBaseUrl}/${props.modelType}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      // Store the token securely on the client side (e.g., in local storage)
      // console.log(`login data: ${data.token}`)
      setUserToken(data.token);
      localStorage.setItem("token", data.token);
      // router.push('/');
      router.push(`/${props.modelType}/dashboard`);
      console.log("Logged in successfully");
    } else if (response.status === 401) {
      console.log("Incorrect password");
      setShowPopup(true);
      setEmail("");
      setPassword("");
    } else {
      console.log("Error logging in");
    }
  };

  return (
    <div
      onClick={() => {
        if (showPopup) setShowPopup(false);
      }}
    >
      <Card>
        <Header
          headline={`Login - ${props.modelType}`}
          subtext={"Please enter credentials below to login to your account"}
        />
        <div className="text-center text-black">
          {/* <h1>Welcome to {props.modelType} login</h1> */}
          <form onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="email">Email</label> */}
              <input
                placeholder="Email"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
              <input
                placeholder="Password"
                className=" mb-5  w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {showPopup && (
              <PopUp
                message={
                  "Incorrect email address or password. Please try again."
                }
              />
            )}
            <button
              type="submit"
              className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
            >
              Login
            </button>
          </form>

          {/* // Render the PatientInfo component if the token exists */}
          {/* {token && <PatientInfo token={token} />}  */}
          {/* {token && <p>{token}</p>}  */}
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;

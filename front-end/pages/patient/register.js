import React, { useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/page/Card";
import Header from "@/components/page/Header";
import config from "@/src/config";
import PopUp from "@/components/page/PopUp";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [profilePictureLink, setProfilePictureLink] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/patient/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          diagnosis,
          profilePictureLink,
          password,
        }),
      });

      if (response.ok) {
        console.log("Patient created successfully");

        router.push(`/patient/login`);
      } else {
        // <PopUp message={"Problem occurred, please answer required fields!"} />;
        setEmail("");
        setDiagnosis("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setProfilePictureLink("");
        console.log("Error creating patient");
      }
    } catch (error) {
      console.log("Error occurred during fetch:", error);
    }

    // console.log('asdasdadadadad asd asd ad ad a dad addadadadadad')
    //${config.apiBaseUrl}/patient/login
  };

  return (
    <div
      onClick={() => {
        if (showPopup) setShowPopup(false);
      }}
    >
      <Card>
        <Header
          headline={`Register - patient`}
          subtext={"Please fill out the form below to create an account"}
        />
        <div className="  text-center">
          <h1>Patient - Register</h1>
          <form className=" text-black " onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                required
                placeholder="First Name"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                type="text"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div>
              {/* <label htmlFor="lastName">Last Name</label> */}
              <input
                required
                placeholder="Last Name"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div>
              {/* <label htmlFor="email">Email address</label> */}
              <textarea
                required
                placeholder="Email"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              {/* <label htmlFor="diagnosis">Diagnosis</label> */}
              <input
                placeholder="Diagnosis"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                type="text"
                id="diagnosis"
                value={diagnosis}
                onChange={(event) => setDiagnosis(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Profile Picture Link"
                type="text"
                id="profilePicture"
                value={profilePictureLink}
                onChange={(event) => setProfilePictureLink(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
              <input
                required
                placeholder="Password"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
              <input
                placeholder="Confirm Password"
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            {showPopup && <PopUp message={"Passwords do not match!"} />}
            <button
              type="submit"
              className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
            >
              Register
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Register;

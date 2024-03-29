import React, { useState } from "react";
import Card from "@/components/page/Card";
import { useRouter } from "next/router";
import Header from "@/components/page/Header";
import config from "@/src/config";
import PopUp from "@/components/page/PopUp";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
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
      const response = await fetch(`${config.apiBaseUrl}/therapist/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          occupation,
          profilePictureLink,
          password,
        }),
      });

      if (response.ok) {
        console.log("Therapist created successfully");
        router.push(`/therapist/login`);
      } else {
        setEmail("");
        setOccupation("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setProfilePictureLink("");
        console.log("Error creating therapist");
      }
    } catch (error) {
      console.log(error);
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
          headline={`Register - therapist`}
          subtext={"Please fill out the form below to create an account"}
        />
        <div className=" text-center">
          <form className=" text-black" onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                required
                placeholder="First Name"
                type="text"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              {/* <label htmlFor="lastName">Last Name</label> */}
              <textarea
                required
                placeholder="Last Name"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              {/* <label htmlFor="email">Email address</label> */}
              <textarea
                required
                placeholder="Email address"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              {/* <label htmlFor="occupation">Occupation</label> */}
              <input
                placeholder="Occupation"
                type="text"
                id="occupation"
                value={occupation}
                onChange={(event) => setOccupation(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              {/* <label htmlFor="occupation">Occupation</label> */}
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
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
              <input
                required
                placeholder="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className=" mb-5 w-52 lg:w-80 appearance-none rounded-3xl border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
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

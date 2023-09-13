import React, { useState } from "react";
import { useAtom } from "jotai";
import { userIdAtom } from "@/components/Layout";
import Header from "@/components/page/Header";
import Card from "@/components/page/Card";
import { Input, Textarea, Select, Option } from "@material-tailwind/react";
import config from "@/src/config";

function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [diseaseTreatment, setDiseaseTreatment] = useState("");
  const [therapistId] = useAtom(userIdAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${config.apiBaseUrl}/exercise/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          diseaseTreatment: [diseaseTreatment],
          therapistId,
        }),
      });

      if (response.ok) {
        console.log("Exercise created successfully");
        setDescription("");
        setDiseaseTreatment("");
        setTitle("");
      } else {
        console.log("Error creating exercise");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Header
        headline={"Create Treatment"}
        subtext={"Create a new treatment modal to assign or promote"}
      />

      {/* <div class="flex flex-col items-center justify-center space-y-6">
    <input type="password" id="password" name="password" placeholder="Password" class="w-80 appearance-none rounded-full 
      border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
    <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" 
      class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
    <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
    <button id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"><span id="showHide">Show</span> Password</button>
  </div> */}

      <form onSubmit={handleSubmit}>
        <div class="flex flex-col items-center justify-center space-y-6">
          <div>
            {/* <label htmlFor="title">Title</label> */}
            <Input
              size="lg"
              label="Title"
              className="w-80 bg-gray-700 text-indigo-200"
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="w-80  mx-auto my-4">
            {/* <label htmlFor="description">Description</label> */}
            <Textarea
              label="Description"
              className="w-80 bg-gray-700 text-indigo-200"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            {/* <label htmlFor="diseaseTreatment">Disease Treatment</label> */}
            <Input
              label="Disease Treatment"
              className="w-80 bg-gray-700 text-indigo-200"
              type="text"
              id="diseaseTreatment"
              autocomplete="off"
              value={diseaseTreatment}
              onChange={(event) => setDiseaseTreatment(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
          >
            Create Treatment
          </button>
        </div>
      </form>
    </Card>
    //   <Card class="h-screen place-content-center  text-slate-300">
    //   <div class="mb-10 text-center text-indigo-400">
    // <h1 class="text-3xl font-bold tracking-widest">Header</h1>
    //   <p><span class="font-bold">Subtext</p>
    // </div>
    //   <form onSubmit={handleSubmit}>
    //    <div class="flex flex-col items-center justify-center space-y-6">
    //     <div>
    //       <label htmlFor="title">Title</label>
    //       <input   className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
    //         type="text"
    //         id="title"
    //         value={title}
    //         onChange={(event) => setTitle(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="description">Description</label>
    //       <textarea   className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
    //         id="description"
    //         value={description}
    //         onChange={(event) => setDescription(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="diseaseTreatment">Disease Treatment</label>
    //       <input   className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
    //         type="text"
    //         id="diseaseTreatment"
    //         value={diseaseTreatment}
    //         onChange={(event) => setDiseaseTreatment(event.target.value)}
    //       />
    //     </div>
    //    <button type="submit" className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500">Create Treatment</button>

    //      </div>
    //   </form>
    // </Card>
    //     <section class="h-screen place-content-center  text-slate-300">
    //   <div class="mb-10 text-center text-indigo-400">
    //     <h1 class="text-3xl font-bold tracking-widest">JQUERY</h1>
    //     <p><span class="font-bold">Password</span> and <span class="font-bold">Confirm</span> validation.</p>
    //   </div>
    //   <div class="flex flex-col items-center justify-center space-y-6">
    //     <input type="password" id="password" name="password" placeholder="Password" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
    //     <div>
    //       <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" class="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500" />
    //       <p id="validation" class="text-center text-orange-500 italic text-sm"></p>
    //     </div>
    //     <button id="showPw" class="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"><span id="showHide">Show</span> Password</button>
    //   </div>
    // </section>
  );
}

export default New;

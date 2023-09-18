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
  const [link, setLink] = useState("");
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
          link,
        }),
      });

      if (response.ok) {
        console.log("Exercise created successfully");
        setDescription("");
        setDiseaseTreatment("");
        setTitle("");
        setLink("");
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

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div>
            {/* <label htmlFor="title">Title</label> */}
            <Input
              size="lg"
              label="Title"
              className="w-52 lg:w-80 bg-gray-700 text-indigo-200"
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="w-52 lg:w-80  mx-auto my-4">
            {/* <label htmlFor="description">Description</label> */}
            <Textarea
              label="Description"
              className="w-52 lg:w-80 bg-gray-700 text-indigo-200"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            {/* <label htmlFor="diseaseTreatment">Disease Treatment</label> */}
            <Input
              label="Disease Treatment"
              className="w-52 lg:w-80 bg-gray-700 text-indigo-200"
              type="text"
              id="diseaseTreatment"
              autocomplete="off"
              value={diseaseTreatment}
              onChange={(event) => setDiseaseTreatment(event.target.value)}
            />
          </div>
          <div>
            {/* <label htmlFor="diseaseTreatment">Disease Treatment</label> */}
            <Input
              label="Video link"
              className="w-52 lg:w-80 bg-gray-700 text-indigo-200"
              type="text"
              id="videoLink"
              autocomplete="off"
              value={link}
              onChange={(event) => setLink(event.target.value)}
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
  );
}

export default New;

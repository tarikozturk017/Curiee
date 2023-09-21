import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m16d0uj",
        "template_orgx027",
        form.current,
        "a3fO_vAMQm2O1ye9t"
      )
      .then(
        (result) => {
          console.log(result.text);

          // Clear the form data after successful submission
          setFormData({
            name: "",
            email: "",
            feedback: "",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="gap-2 flex flex-col my-8 text-md">
        <label>Name</label>
        <input
          className="w-52 lg:w-80 rounded-2xl mb-2 text-black "
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          className="w-52 lg:w-80 rounded-2xl mb-2 text-black"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Feedback</label>
        <textarea
          className="w-60 lg:w-1/2 rounded-2xl mb-2 text-black"
          name="feedback"
          value={formData.feedback}
          onChange={handleInputChange}
        />
        <input
          className="w-32 my-4  hover:cursor-pointer rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
          type="submit"
          value="Send"
        />
      </div>
    </form>
  );
};

export default Feedback;

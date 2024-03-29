import Feedback from "@/components/page/Feedback";

const About = () => {
  return (
    <section className=" text-sm lg:text-base w-11/12 md:w-3/4 lg:w-3/6 mt-12 mx-auto text-blue-100">
      <h2 className="text-2xl lg:text-3xl font-semibold text-orange-400 mb-4">
        About Curie
      </h2>
      <p className="leading-relaxed ">
        Curie is a revolutionary healthcare platform designed to make healthcare
        accessible to everyone. Our mission is to help patients to find best
        therapists and treatments for their diseases. While it helps therapists
        to promote themselves, it also enable patients connect patients with the
        best healthcare providers in the industry.
      </p>
      <p className="leading-relaxed mt-4 font-bold">With Curie, you can:</p>
      <ul className="list-disc list-inside  ml-6">
        <li>
          Enables to explore treatment models, and also find therapists with
          high rate
        </li>
        <li>
          Allows therapists/patients connections so that it will enhance the
          recovery process
        </li>
        <li>
          Helps therapists to explain treatment models in more effective way
        </li>
        <li>Avoids misunderstanding between patients & therapist</li>
      </ul>
      <h2 className="text-2xl lg:text-3xl font-semibold text-orange-400 mt-8 my-4">
        Development
      </h2>
      <p className="leading-relaxed ">
        This application is still in development process. Even though it has
        some of the fundamental functionalities, there are features in being
        developed as follows:
        <ul className="list-disc list-inside  ml-6">
          <li>
            Currently only YouTube links can be added, it will be updated to
            upload with jpeg/png format and mp4 video format.
          </li>
          <li>
            Therapists can only add their profile picture via link. It will be
            updated to upload with jpeg/png format
          </li>
          <li>Treatment models will be more detailed</li>
          <li>
            Rating is currently working, however the star chart will be dynamic.
          </li>
          <li>User Interface will be updated, styling will be improved</li>
          <li>
            Currently is not mobile friendly, once the features are all set, it
            will be implemented
          </li>
        </ul>
      </p>
      <h2 className="text-2xl lg:text-3xl font-semibold text-orange-400 mt-8 my-4">
        Demo Instructions
      </h2>
      <p className="leading-relaxed ">
        Please use the patients or therapists credentials provided on the
        Homepage for the full features. If you wish to create one, please click
        on register.{" "}
      </p>
      <h2 className="text-2xl lg:text-3xl font-semibold text-orange-400 mt-8 my-4">
        Suggestions/Feedback
      </h2>
      <p className="leading-relaxed ">
        If you want to contribute to this project, or you have any feedback,
        please reach out to me!
      </p>
      <Feedback />
      <p className="leading-relaxed ">Give me feedback</p>
      <div className=" md:hidden h-24"></div>
    </section>
  );
};

export default About;

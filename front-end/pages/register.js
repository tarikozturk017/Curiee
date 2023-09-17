import Link from "next/link";
import Header from "@/components/page/Header";
import Card from "@/components/page/Card";

const Register = () => {
  return (
    <Card>
      <Header
        headline={"Select Register"}
        subtext={"Please register as a Patient or Therapist"}
      />
      <div className=" space-x-2 text-sm md:text-base md:space-x-4 text-center">
        <button className=" rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500">
          <Link href="/patient/register">Patient</Link>
        </button>
        <button className=" rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500">
          <Link href="/therapist/register">Therapist</Link>
        </button>
      </div>
    </Card>
  );
};
export default Register;

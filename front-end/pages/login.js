import Link from "next/link";
import Header from "@/components/page/Header";
import Card from "@/components/page/Card";

const Login = () => {
  return (
    <Card>
      <Header
        headline={"Select Login"}
        subtext={"Please login if you are a Patient or Therapist"}
      />
      <div className=" space-x-2 text-sm md:text-base md:space-x-4 text-center">
        <button className=" rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500">
          <Link href="/patient/login">Patient</Link>
        </button>
        <button className=" rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500">
          <Link href="/therapist/login">Therapist</Link>
        </button>
      </div>
    </Card>
  );
};
export default Login;

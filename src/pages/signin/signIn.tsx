import Form from "./components/signInForm";
import Lottie from "lottie-react";
import signIn from "../../assets/signin.json";

const SignIn = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen @container bg-white">
        <div className="flex items-center justify-center w-full h-full text-[#585858] ">
          <div className="h-full w-[50%] hidden @[55em]:block">
            {/* <img
              src={logo}
              alt="sts-logo"
              className="object-cover w-full h-full"
            /> */}
            <Lottie animationData={signIn} />
          </div>
          <div className="w-full @[55em]:w-[50%] flex flex-col justify-center items-center">
            <Form />
            <div className="mt-10">
              <p className="text-[.8rem] font-semibold font-[#585858]">
                Developed and managed by{" "}
                <span className="font-mono font-bold text-[1.1rem] uppercase">
                  Niroj
                </span>{" "}
                since 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

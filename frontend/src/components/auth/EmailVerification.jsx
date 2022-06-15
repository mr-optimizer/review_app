import React, { useState } from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import Submit from "../form/Submit";
import Title from "./../form/Title";

const OPT_LENGTH = 6;
export default function EmailVerification() {
  const [opt, setOpt] = useState(new Array(OPT_LENGTH).fill(""));

  return (
    <div className="fixed inset-0 bg-primary -z-10  flex justify-center items-center">
      <Container>
        <form action="" className=" bg-secondary rounded p-6 space-y-6">
          <div>
            <Title>Please Enter OPT to verify your account</Title>
            <p className=" text-center text-dark-subtle">
              OTP has been sent to your Email
            </p>
          </div>
          <div className=" flex justify-center items-center space-x-4">
            {opt.map((_, index) => {
              return (
                <input
                  className=" w-12 h-12 border-2 rounded border-dark-subtle focus:border-white bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
                  type="number"
                />
              );
            })}
          </div>
          <Submit value="Send Link" />
        </form>
      </Container>
    </div>
  );
}

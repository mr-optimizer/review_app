import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import { FormContainer } from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "./../form/Title";

const OPT_LENGTH = 6;
let currentOTPIndex;
export default function EmailVerification() {
  const [otp, setOpt] = useState(new Array(OPT_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPrevInputField = (index) => {
    index = index === 0 ? 0 : index - 1;
    setActiveOtpIndex(index);
  };
  const handleOtpChange = (e) => {
    const value = e.target.value;
    let newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);
    if (!value) {
      focusPrevInputField(currentOTPIndex);
    } else {
      focusNextInputField(currentOTPIndex);
    }
    setOpt([...newOtp]);
  };
  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };
  return (
    <FormContainer>
      <Container>
        <form action="" className={commonModelClasses}>
          <div>
            <Title>Please Enter OPT to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your Email
            </p>
          </div>
          <div className=" flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  className=" w-12 h-12 border-2 rounded dark:border-dark-subtle dark:focus:border-white focus:border-primary bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                  type="number"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              );
            })}
          </div>
          <Submit value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
}

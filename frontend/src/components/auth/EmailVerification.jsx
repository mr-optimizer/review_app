import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks/customHooks";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import { FormContainer } from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "./../form/Title";

const OPT_LENGTH = 6;
let currentOTPIndex;
const isValidOTP = (otp) => {
  for (let val of otp) {
    if (isNaN(parseInt(val))) return false;
  }
  return true;
};
export default function EmailVerification() {
  const [otp, setOpt] = useState(new Array(OPT_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { state } = useLocation();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;
  const user = state?.user;
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified ,navigate]);

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
  const handleOtpResend = async() => {
    const {error, message} = await resendEmailVerificationToken(user.id)
    if(error) return updateNotification('error', error);
    updateNotification('success', message);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOTP(otp)) {
      return updateNotification("error", "Invalid OTP!!");
    }
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    console.log(userResponse.token);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
    navigate("/");
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses}>
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
          <div>
          <Submit value="Verify Account" />
          <button onClick={handleOtpResend} type="button" className="dark:text-white text-blue-500 font-semibold hover:underline mt-2">I don't have OTP</button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

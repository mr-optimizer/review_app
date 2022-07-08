import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks/customHooks";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import { FormContainer } from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";

export default function ForgotPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, userId);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", {
        replace: true,
      });
      return updateNotification("error", error);
    }
    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", {
        replace: true,
      });
    }
    setIsValid(true);
  };

  useEffect(() => {
    isValidToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isVerifying) {
    return (
      <FormContainer>
        <Container>
          <div className=" flex space-x-2 items-center">
            <h1 className=" text-4xl font-semibold dark:text-white text-primary">
              Please wait while we are verifying Your token
            </h1>
            <ImSpinner3 className=" animate-spin  text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );
  }
  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <div className=" flex space-x-2 items-center">
            <h1 className=" text-4xl font-semibold dark:text-white text-primary">
              Sorry, Your token is not valid
            </h1>
          </div>
        </Container>
      </FormContainer>
    );
  }
  const handleChange = ({target}) => {
    const {name, value} = target;
     setPassword({...password, [name]:value});
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!password.one.trim()){
      return updateNotification('error', 'Password is missing!')
    }
    if(password.one.trim().length < 8){
      return updateNotification('error', 'Password must be 8 characters long! ')
    }
    if(password.one !== password.two){
      return updateNotification('error', 'Password not matched!')
    }
    const {error, message} = await resetPassword({newPassword: password.one, userId, token})
    if(error){
      return updateNotification('error', error);
    } 
    updateNotification('success', message);
    navigate('/auth/sign-in', {replace: true}); 
  }
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="***************"
            name="one"
            value={password.one}
            onChange={handleChange}
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="***************"
            name="two"
            onChange={handleChange}
            value={password.two}
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}

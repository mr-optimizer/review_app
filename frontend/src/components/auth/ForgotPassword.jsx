import React, { useState } from "react";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import { FormContainer } from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../../hooks/customHooks";
import { forgetPassword } from "../../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();
  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      return updateNotification("error", "Invalid Email! ");
    }
    const { error, message } = await forgetPassword(email);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };
  return (
    <FormContainer>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={commonModelClasses + "w-96 space-y-6"}
        >
          <Title>Please Enter Your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="abcd@gmail.com"
            name="email"
          />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/sign-in">Sign in </CustomLink>
            <CustomLink to="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

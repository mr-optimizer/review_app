import React from "react";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import { FormContainer } from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
export default function ForgotPassword() {
  return (
    <FormContainer>
      <Container>
        <form action="" className={commonModelClasses + "w-96 space-y-6"}>
          <Title>Please Enter Your Email</Title>
          <FormInput label="Email" placeholder="abcd@gmail.com" name="email" />
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

import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
import CustomLink from "../CustomLink";
import { commonModelClasses } from "../../utils/theme";
import { FormContainer } from "../form/FormContainer";

export default function SignUp() {
  return (
    <FormContainer>
      <Container>
        <form action="" className={commonModelClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput label="Name" placeholder="Shubham Kumar" name="name" />
          <FormInput
            label="Email"
            placeholder="shubham@gmail.com"
            name="email"
          />
          <FormInput
            label="Password"
            placeholder="**************"
            name="password"
          />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forgot-password">Forgot Password</CustomLink>
            <CustomLink to="/auth/sign-in">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

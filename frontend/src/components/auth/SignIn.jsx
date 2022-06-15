import React from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
export default function SignIn() {
  return (
    <div className="fixed inset-0 bg-primary -z-10  flex justify-center items-center">
      <Container>
        <form action="" className=" bg-secondary rounded p-6 w-72 space-y-4">
          <Title>Sign in</Title>
          <FormInput label="Email" placeholder="abcd@gmailcom" name="email" />
          <FormInput
            label="Password"
            placeholder="**************"
            name="password"
          />
          <Submit value="Sign in" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forgot-password">Forgot Password</CustomLink>
            <CustomLink to="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

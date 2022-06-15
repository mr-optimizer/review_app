import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
import CustomLink from "../CustomLink";

export default function SignUp() {
  return (
    <div className="fixed inset-0 bg-primary -z-10  flex justify-center items-center">
      <Container>
        <form action="" className=" bg-secondary rounded p-6 w-72 space-y-4">
          <Title>Sign up</Title>
          <FormInput label="Name" placeholder="Shubham Kumar" name="name" />
          <FormInput
            label="Email"
            placeholder="shubham@gmailcom"
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
    </div>
  );
}

import React from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
import { useTheme } from "../../hooks/customHooks";
import { commonModelClasses } from "../../utils/theme";
import { FormContainer } from "../form/FormContainer";
export default function SignIn() {
  const theme = useTheme();
  return (
    <FormContainer>
      <Container>
        <form action="" className={commonModelClasses + " w-72"}>
          <Title>Sign in</Title>
          <FormInput label="Email" placeholder="abcd@gmail.com" name="email" />
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
    </FormContainer>
  );
}

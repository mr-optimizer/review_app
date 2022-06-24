import React from "react";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import { FormContainer } from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
export default function ForgotPassword() {
  return (
    <FormContainer>
      <Container>
        <form action="" className= { commonModelClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="***************"
            name="password"
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="***************"
            name="confirmPassword"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}

import React, { useState } from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
import { commonModelClasses } from "../../utils/theme";
import { FormContainer } from "../form/FormContainer";
import { useAuth, useNotification } from "../../hooks/customHooks";

const validateUserInfo = ({ email, password }) => {
  const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email!!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!! " };
  return { ok: true, error: null };
};

export default function SignIn() {
  const [userInfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const {isPending} = authInfo;
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserinfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password);
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses + " w-72"}>
          <Title>Sign in</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="abcd@gmail.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="**************"
            name="password"
            type="password"
          />
          <Submit value="Sign in" busy={isPending} />
          <div className="flex justify-between">
            <CustomLink to="/auth/forgot-password">Forgot Password</CustomLink>
            <CustomLink to="/auth/sign-up">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

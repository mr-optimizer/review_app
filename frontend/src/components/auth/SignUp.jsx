import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "./../form/Title";
import CustomLink from "../CustomLink";
import { commonModelClasses } from "../../utils/theme";
import { FormContainer } from "../form/FormContainer";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks/customHooks";
import { useEffect } from "react";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;
  if (!name.trim()) return { ok: false, error: "Name is missing!!" };
  if (!isValidName.test(name)) return { ok: false, error: "Name is Invalid!!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email!!" };
  if (!password.trim()) return { ok: false, error: "Password is missing!!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!! " };
  return { ok: true, error: null };
};

export default function SignUp() {
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const [userInfo, setUserinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const { name, email, password } = userInfo;
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserinfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);
    const { error: err, user } = await createUser(userInfo);
    if (err) return updateNotification("error", err);
    navigate("/auth/verification", {
      state: { user: user },
      replace: true,
    });
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            label="Name"
            value={name}
            placeholder="Shubham Kumar"
            name="name"
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            placeholder="shubham@gmail.com"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            placeholder="**************"
            value={password}
            name="password"
            type="password"
            onChange={handleChange}
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

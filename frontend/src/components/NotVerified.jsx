import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/customHooks";
import Container from "./Container";
export const NotVerified = () => {
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    const navigate = useNavigate();
    const navigateToVerification = () => {
      navigate("/auth/verification", { state: { user: authInfo.profile } });
    };
    return (
      <Container>
        {isLoggedIn && !isVerified ? (
          <p className=" text-lg text-center bg-blue-50 p-2">
            It look like you haven't verified your account{" "}
            <button
              onClick={navigateToVerification}
              className=" text-blue-500 font-semibold hover:underline"
            >
              {" "}
              Click here to verify your account
            </button>
          </p>
        ) : null}
      </Container>
    );
  
}

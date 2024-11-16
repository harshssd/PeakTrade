import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Message from "../components/Message";
import FormWrapper from "../components/FormWrapper";
import { useAuth } from "../auth/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      login();
      navigate("/journal"); // Redirect to Trade Journal on successful login
    } catch (error: any) {
      if (error.code.includes("auth/invalid-credential")) {
        setError(
          "Invalid login credentials. Please check your email and password."
        );
      } else if (error.code.includes("auth/invalid-email")) {
        setError("Invalid email format. Please enter a valid email address.");
      } else if (error.message.includes("auth/too-many-requests")) {
        setError(
          "Too many unsuccessful login attempts. Please try again later or reset your password."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset link has been sent to your email.");
      setError(null);
    } catch (error: any) {
      if (error.message.includes("auth/user-not-found")) {
        setError(
          "No user found with this email. Please check your email or sign up."
        );
      } else if (error.message.includes("auth/invalid-email")) {
        setError("Invalid email format. Please enter a valid email address.");
      } else {
        setError(
          "Failed to send password reset email. Please try again later."
        );
      }
    }
  };

  return (
    <FormWrapper title="Login">
      {error && <Message text={error} type="error" />}
      {successMessage && <Message text={successMessage} type="success" />}
      <InputField
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleLogin}
      >Login</Button>
      <Button
        onClick={handleForgotPassword}
        color="green"
      >Forgot Password?</Button>
      <p className="text-center text-sm text-gray-700 dark:text-gray-400">
        Don't have an account?{" "}
        <span
          className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          Sign up here
        </span>
      </p>
    </FormWrapper>
  );
};

export default Login;

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Message from "../components/Message";
import FormWrapper from "../components/FormWrapper";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Account created successfully! Redirecting...");
      setError(null);
      setTimeout(() => navigate("/journal"), 2000); // Redirect to Trade Journal after a short delay
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different email.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <FormWrapper title="Signup">
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
        onClick={handleSignup}
        text="Signup"
        color="bg-green-500 hover:bg-green-600"
      />
      <p className="text-center text-sm text-gray-700 dark:text-gray-400">
        Already have an account?{" "}
        <span
          className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </FormWrapper>
  );
};

export default Signup;

import React, { useState } from "react";
import { EmailEntry } from "../Components/EmailEntry";
import { SignUpForm } from "../Components/SignUpForm";
import { SignInForm } from "../Components/SignInForm";

export interface UserInfo {
  name: string;
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("jane.doe@gmail.com");
  const [name, setName] = useState("Jane Doe");

  return (
    <div className="min-h-screen  flex items-center justify-center bg-pink-200 overflow-x-auto">
      <div className="flex gap-4 p-4">
        <EmailEntry
          onContinue={(email) => console.log("Continue with:", email)}
        />

        <SignUpForm
          email={email}
          onSignUp={(data) => console.log("Signed up:", data)}
        />

        <SignInForm email={email} name={name} />
      </div>
    </div>
  );
};

export default AuthPage;

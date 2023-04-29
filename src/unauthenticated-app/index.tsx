import { useState } from "react";
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        Switch to: {isRegister ? "Login" : "Register"}
      </button>
    </div>
  );
};

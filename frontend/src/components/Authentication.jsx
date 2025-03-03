import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication({ handleCloseModal }) {
  const [isRegistration, setIsRegistration] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { signup, login } = useAuth();

  async function handleAuthenticate() {
    if (
      !username ||
      (isRegistration && (!email || !email.includes("@"))) ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    ) {
      return;
    }
    try {
      setIsAuthenticating(true);
      setError(null);

      if (isRegistration) {
        //register a user
        await signup(username, email, password);
      } else {
        //login a user
        await login(username, password);
      }
      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">
        {isRegistration ? "Sign Up" : "Login"}
      </h2>
      <p>
        {isRegistration ? "Create an account!" : "Sign in to your account!"}
      </p>
      {error && <p className="text-red-500">{error}</p>}

      <input
        className="px-3 py-1 text-lg bg-gray-100 rounded-xl"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      {isRegistration && (
        <input
          className="px-3 py-1 text-lg bg-gray-100 rounded-xl"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
      )}
      <input
        className="px-3 py-1 text-lg  bg-gray-100 rounded-xl"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="******"
        type="password"
      />
      <button
        className="bg-blue-600 py-2 text-xl font-semibold rounded-2xl text-white cursor-pointer hover:bg-blue-800 duration-200"
        onClick={handleAuthenticate}
      >
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          className="bg-blue-600 py-2 md:text-lg px-4 mt-2 font-semibold rounded-2xl text-white cursor-pointer hover:bg-blue-800 duration-200"
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Login" : "Sign Up"}</p>
        </button>
      </div>
    </>
  );
}

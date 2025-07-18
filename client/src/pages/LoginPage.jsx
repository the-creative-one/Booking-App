import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const user = await axios.post("/login", { email, password });
      setUser(user.data);
      alert("Login Successful!");
      setRedirect(true);
    } catch (error) {
      alert("Login Failed!");
    }
  }
  // it will check if the redirect is set to true, and if the redirect is true then it'll redirect to the "INDEX-PAGE"
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="text-2xl font-semibold text-center mb-5">
          Welcome back, adventurer!
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="login">Login</button>
          <div className="mt-1 text-sm text-gray-500">
            Don&#39;t have an account yet?&nbsp;
            <Link to="/register" className="text-register underline">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

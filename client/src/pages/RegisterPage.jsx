import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful!");
    } catch (error) {
      console.log(error);
      alert("Error in Registration!");
    }
  }
  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-28">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Start Your Adventure Now
        </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
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
          <button className="login">Register Now</button>
          <div className="mt-1 text-sm text-gray-500">
            Already have an account?&nbsp;
            <Link to="/login" className="text-register underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

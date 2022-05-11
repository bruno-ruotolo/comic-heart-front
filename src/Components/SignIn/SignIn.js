import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

import { UserContext } from "../../Context/UserContext ";

import Logo from "./Logo.png"

export default function SignIn() {
  const navigate = useNavigate();

  const { setUserInfos } = useContext(UserContext);

  const userTokenStorage = localStorage.getItem("token");
  const userNameStorage = localStorage.getItem("name");

  useEffect(() => {
    if (userTokenStorage && userNameStorage) navigate("/main")
  }, [navigate, userTokenStorage, userNameStorage]);

  const [userSignIn, setUserSignIn] = useState({ email: "", password: "" });
  const [signInState, setSignInState] = useState(false);

  function handleInput(e, property) {
    if (property === "email") {
      setUserSignIn({ ...userSignIn, [property]: e.target.value.toLowerCase() });
    } else setUserSignIn({ ...userSignIn, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userSignIn)
    setSignInState(true);
    const URL = "http://localhost:5000";
    const promise = axios.post(`${URL}/`, userSignIn);

    promise.then(response => {
      const { data } = response;
      setUserInfos(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      setSignInState(false);
      navigate("/main")
    });

    promise.catch((e) => {
      Swal.fire({
        icon: 'error',
        title: e.response.data,
        text: 'Verifique seus dados e tente novamente',
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000"
      });
      setSignInState(false);
    })
  }


  return (
    <SignInSection>
      <img src={Logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={userSignIn.email}
          onChange={(e) => handleInput(e, "email")}
          required
          disabled={signInState}
        />

        <input
          type="password"
          placeholder="Senha"
          value={userSignIn.password}
          onChange={(e) => handleInput(e, "password")}
          required
          autoComplete="on"
          disabled={signInState}
        />

        <button disabled={signInState}>
          {!signInState ? "Entrai!" : <Bars color="#F3EED9" width={45} />}
        </button>
      </form>

      <p onClick={() => navigate("/sign-up")}>Novo aqui? Se cadastre!</p>
    </SignInSection>
  )
}

const SignInSection = styled.section`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;

  img {
    margin-bottom: 40px;
    margin-top: 25px;
  }

  form {
    display:flex;
    align-items:center;
    justify-content:center;
  }

  input {
    width: 283px;
    height: 47px;
    margin-bottom: 24px;
  }

  button {
    width: 283px;
    height: 47px;
    margin-top:20px;
    margin-bottom: 35px;
  }

  p {
    font-family: 'Fredoka One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #F3EED9;
  }

`
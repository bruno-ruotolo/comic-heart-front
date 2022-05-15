import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

import LogoMini from "./LogoMini.png"

export default function SignUp() {

  const navigate = useNavigate();

  const [userSignUp, setSignUp] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const [signUpStatus, setSignUpStatus] = useState(false);

  function handleInputs(e, property) {
    setSignUp({ ...userSignUp, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSignUpStatus(true);
    const URL = "http://localhost:5000"
    const promise = axios.post(`${URL}/sign-up`, userSignUp);
    promise.then((response) => {
      Swal.fire({
        icon: 'success',
        title: "Cadastro Realizado",
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000"
      });
      setSignUpStatus(false);
      navigate("/");
    });

    promise.catch((e) => {
      if (e.response.data[0] === "\"passwordConfirm\" must be [ref:password]") {
        Swal.fire({
          icon: 'error',
          title: "Senhas inconsistentes",
          text: 'Verique se as senhas são correspondentes',
          width: 326,
          background: "#F3EED9",
          confirmButtonColor: "#4E0000",
          color: "#4E0000"
        });
      } else if (e.response.data[0] === "\"email\" must be a valid email") {
        Swal.fire({
          icon: 'error',
          title: "E-mail Incorreto",
          text: 'Verique se digitou seu e-mail corretamente',
          width: 326,
          background: "#F3EED9",
          confirmButtonColor: "#4E0000",
          color: "#4E0000"
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: e.response.data,
          text: 'Verifique seus dados e tente novamente',
          width: 326,
          background: "#F3EED9",
          confirmButtonColor: "#4E0000",
          color: "#4E0000",
        });
      }
      setSignUpStatus(false);
    });
  }

  return (
    <SignUpSection>
      <img src={LogoMini} alt="Teste" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={userSignUp.name}
          onChange={(e) => handleInputs(e, "name")}
          required
          disabled={signUpStatus}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={userSignUp.email}
          onChange={(e) => handleInputs(e, "email")}
          required
          disabled={signUpStatus}
        />

        <input
          type="password"
          placeholder="Senha"
          value={userSignUp.password}
          onChange={(e) => handleInputs(e, "password")}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$"
          title="No mínimo 6 caracteres com ao menos uma maiscula, uma minuscula e um número"
          autoComplete="on"
          required
          disabled={signUpStatus}
        />

        <input
          type="password"
          placeholder="Confirme a Senha"
          value={userSignUp.passwordConfirm}
          onChange={(e) => handleInputs(e, "passwordConfirm")}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\d)[A-Za-z\d]{6,}$"
          title="No mínimo 6 caracteres com ao menos uma maiscula, uma minuscula e um número"
          autoComplete="on"
          required
          disabled={signUpStatus}
        />

        <button disabled={signUpStatus}>
          {!signUpStatus ? "Tudo Pronto!" : <Bars color="#F3EED9" width={45} />}
        </button>
      </form>
      <p onClick={() => navigate("/")}>Já tenho conta, quero entrar!</p>
    </SignUpSection>
  )
}

const SignUpSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  width: 100%;
  @media(min-width: 800px){
      margin-top: 100px;
    }

  img {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  input {
    width: 283px;
    height: 47px;
    margin-bottom: 27px;
    @media(min-width: 800px){
      width: 383px;
    }
  }

  button {
    width: 283px;
    height: 47px;
    margin-bottom: 35px;
    margin-top: 15px;
  }

  p {
    font-family: 'Fredoka One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #F3EED9;
    cursor:pointer;
  }
`
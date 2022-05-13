import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import { UserContext } from "../Context/UserContext ";

export default function Checkout() {
  const { userInfos } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <CheckoutSection>
      <h1>Selecione a forma de pagamento</h1>
      <form>
        <input></input> Boleto Vencimento em 1 dia útil
        <input></input> Pix Vencimento em 30 minutos
        <input></input> Cartão de Crédito Cliente: User E-mail: User e-mail
        Digite seu CPF: <input type="text" placeholder="CPF"></input>
        <button type="submit">Confirmar (R$ valorTotal)</button>
      </form>
    </CheckoutSection>
  );
}

const CheckoutSection = styled.section``;

import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import { UserContext } from "../Context/UserContext ";

export default function Checkout() {
  const { userInfos } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalValue } = location.state;
  const [dadosUser, setDadosUser] = useState({});
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "http://localhost:5000";
    async function getCheckout() {
      try {
        const info = await axios.get(`${URL}/checkout`, config);
        setDadosUser(info.data);
      } catch (e) {
        console.log("Houve problema na requisição do checkout" + e);
        Swal.fire({
          icon: "warning",
          title: "Sessão Experidada",
          text: "Faça Login Novamente",
          width: 326,
          background: "#F3EED9",
          confirmButtonColor: "#4E0000",
          color: "#4E0000",
        });
        navigate("/");
      }
    }
    getCheckout();
  }, [navigate, userInfos.token]);
  console.log(dadosUser);
  //TODO Pensar em como tratar esses inputs de radio e como pegar a info de cada um... Ainda por cima, ver a lógica
  // para que quando estiver selecionado no cartão de crédito, surgir com os 3 inputs novos --> Num do cartao, vencimento e CVV
  return (
    <CheckoutSection>
      <ion-icon name="caret-back"></ion-icon>
      <h1>Selecione a forma de pagamento</h1>
      <form>
        <ContainerRadio>
          <input type="radio" name="formaPagamento" value="boleto"></input>{" "}
          <div>
            <label>Boleto</label>
            <p>Vencimento em 1 dia útil</p>
          </div>
        </ContainerRadio>
        <ContainerRadio>
          <input type="radio" name="formaPagamento" value="pix"></input>{" "}
          <div>
            <label>Pix</label>
            <p>Vencimento em 30 minutos</p>
          </div>
        </ContainerRadio>
        <ContainerRadio>
          <input type="radio" name="formaPagamento" value="cartao"></input>
          <label>Cartão de Crédito</label>
        </ContainerRadio>
        <ClienteEmail>
          <span>Cliente:</span> {dadosUser?.name}
        </ClienteEmail>
        <ClienteEmail>
          <span>E-mail:</span> {dadosUser?.email}
        </ClienteEmail>
        <CPF>Digite seu CPF:</CPF>
        <InputCpf
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        ></InputCpf>
        <Submit type="submit">Confirmar (R$ {totalValue})</Submit>
      </form>
    </CheckoutSection>
  );
}

const CheckoutSection = styled.section`
  color: #f3eed9;
  display: flex;
  flex-direction: column;

  ion-icon {
    font-size: 40px;
    position: absolute;
    left: 0;
    top: 0;
  }

  h1 {
    font-family: "Fredoka One";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 95%;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    font-family: "Lexend Deca";
    font-style: normal;
  }

  span {
    font-weight: 700;
  }
`;

const ContainerRadio = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 46px;
  text-align: left;

  label {
    font-weight: 700;
    font-size: 16px;
    line-height: 95%;
  }

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 95%;
  }
`;

const ClienteEmail = styled.p`
  margin-bottom: 8px;
`;

const CPF = styled.p`
  margin-top: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 95%;
  margin-bottom: 10px;
`;

const InputCpf = styled.input`
  margin-bottom: 36px;
  background: #f3eed9;
  box-shadow: inset 0px 0px 2px #4e0000;
  border-radius: 8px;
  width: 261px;
  height: 40px;
`;

const Submit = styled.button`
  width: 337px;
  height: 47px;
`;

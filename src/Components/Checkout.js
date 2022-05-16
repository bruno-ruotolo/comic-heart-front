import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";

import { UserContext } from "../Context/UserContext ";

export default function Checkout() {
  const navigate = useNavigate();

  const { userInfos } = useContext(UserContext);

  const [dadosUser, setDadosUser] = useState({});
  const [cpf, setCpf] = useState("");
  const [payment, setPayment] = useState();
  const [total, setTotal] = useState(0);
  const [checkoutState, setCheckoutState] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "https://projeto14-comic-heart.herokuapp.com";
    async function getCheckout() {
      try {
        const info = await axios.get(`${URL}/checkout`, config);
        setDadosUser(info.data);

        const cart = await axios.get(`${URL}/cart`, config);
        let somatorio = 0;
        cart.data.forEach((cart) => {
          somatorio += cart.value * cart.quant;
        });
        if (somatorio === 0) navigate("/main");
        setTotal(somatorio.toFixed(2));
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


  async function handleSubmit(e) {
    e.preventDefault();
    setCheckoutState(true);
    if (payment === "cartao" || payment?.name === "cartao") payment.numCartao = payment.numCartao.replaceAll(" ", "")
    const objPost = { payment, cpf: cpf.replaceAll(".", "").replaceAll("-", ""), totalValue: total };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfos.token}`,
        },
      };
      const URL = "https://projeto14-comic-heart.herokuapp.com";
      await axios.post(`${URL}/checkout`, objPost, config);
      Swal.fire({
        icon: "success",
        title: "Compra efetuada com sucesso!",
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000",
      });
      setCheckoutState(false);
      navigate("/main");
    } catch (e) {
      console.log("Houve problema no post do checkout" + e);
      Swal.fire({
        icon: "warning",
        title: "Sessão Experidada",
        text: "Faça Login Novamente",
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000",
      });
      setCheckoutState(false);
      navigate("/");
    }
  }

  function onValueChange(event) {
    if (event.target.value === "cartao") {
      setPayment({ name: "cartao" });
    } else {
      setPayment(event.target.value);
    }
  }

  return !(Object.keys(dadosUser).length === 0) ? (
    <CheckoutSection>
      <ion-icon
        onClick={() => navigate("/address")}
        name="caret-back"
      ></ion-icon>
      <h1>Selecione a forma de pagamento</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Inputs>
          <ContainerRadio>
            <input
              type="radio"
              name="formaPagamento"
              value="boleto"
              checked={payment === "boleto"}
              onChange={onValueChange}
              disabled={checkoutState}
            />
            <div>
              <label>Boleto</label>
              <p>Vencimento em 1 dia útil</p>
            </div>
          </ContainerRadio>
          <ContainerRadio>
            <input
              type="radio"
              name="formaPagamento"
              value="pix"
              checked={payment === "pix"}
              onChange={onValueChange}
              disabled={checkoutState}
            />
            <div>
              <label>Pix</label>
              <p>Vencimento em 30 minutos</p>
            </div>
          </ContainerRadio>
          <ContainerRadio>
            <input
              type="radio"
              name="formaPagamento"
              value="cartao"
              required
              checked={payment?.name === "cartao"}
              onChange={onValueChange}
              disabled={checkoutState}
            />
            <label>Cartão de Crédito</label>
          </ContainerRadio>
          {payment === "cartao" || payment?.name === "cartao" ? (
            <>
              <NumCartao
                type="text"
                placeholder="Número do Cartão"
                value={payment.numCartao || ""}
                pattern=".{19}"
                maxLength="19"
                title="Cartão Inválido"
                required
                disabled={checkoutState}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .replace(/(\d{4})(\d)/, "$1 $2")
                    .replace(/(\d{4})(\d)/, "$1 $2")
                    .replace(/(\d{4})(\d)/, "$1 $2")
                  setPayment({
                    ...payment,
                    name: "cartao",
                    numCartao: e.target.value,
                  })
                }}
              />
              <DivFlex>
                <Vencimento
                  type="text"
                  placeholder="Vencimento"
                  title="Data Inválida"
                  required
                  pattern="(\d{2})/(\d{2})"
                  maxLength="5"
                  disabled={checkoutState}
                  value={payment.vencimento || ""}
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{2})(\d)/, "$1/$2")
                    setPayment({
                      ...payment,
                      name: "cartao",
                      vencimento: e.target.value,
                    })
                  }}
                />
                <CVV
                  type="text"
                  placeholder="CVV"
                  maxLength="3"
                  pattern="\d{3}"
                  title="CVV Inválido"
                  disabled={checkoutState}
                  required
                  value={payment.cvv || ""}
                  onChange={(e) =>
                    setPayment({
                      ...payment,
                      name: "cartao",
                      cvv: e.target.value,
                    })
                  }
                />
              </DivFlex>
            </>
          ) : (
            <></>
          )}
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
            maxLength="14"
            pattern="(\d{3})\.(\d{3})\.(\d{3})-(\d{2})"
            value={cpf}
            title="CPF Inválido"
            disabled={checkoutState}
            onChange={(e) => {
              e.target.value = e.target.value
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1-$2")
              setCpf(e.target.value)
            }}
            required
          ></InputCpf>
        </Inputs>
        <Submit disabled={checkoutState} type="submit">
          {!checkoutState ? `Confirmar (R$ ${total.toString().replace(".", ",")})` : <Bars width={50} color="#F3EED9" />}
        </Submit>
      </form>
    </CheckoutSection>
  )
    : <CheckoutSection>
      <Bars height={500} width={100} color="#F3EED9" />
    </CheckoutSection>;
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
    cursor: pointer;
    @media(min-width:800px){
      top: 30px;
      left: 30px;
    }
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
    align-items:center;
    margin-top: 20px;
    font-style: normal;
    width: 100%;
  }

  span {
    font-weight: 700;
    @media(min-width:800px){
      font-size: 20px;
    }
  }
`;

const Inputs = styled.div`

`

const ContainerRadio = styled.div`
  display: flex;
  margin-bottom: 35px;
  text-align: left;

  @media(min-width:800px){
    margin-bottom: 55px;
  }

  label:last-child{
    margin-top:5px;
  }

  input {
    accent-color: #ec665c;
    width:30px;
    height: 17px;
    cursor: pointer;

    @media(min-width:800px){
      height: 22px;
    }
  }

  label {
    font-weight: 700;
    font-size: 16px;
    line-height: 95%;
    @media(min-width:800px){
      font-size: 22px;
    }
  }

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 95%;
  }
`;

const NumCartao = styled.input`
  &:focus{
        outline-color: #080;
      }

  &:focus:invalid{
    outline-color:#FF0000;
  }

  margin-top:-37px;
  width: 261px;
  height: 40px;
  margin-bottom: 7px;

  @media(min-width:800px){
    width: 370px;
  }
`;

const DivFlex = styled.div`
  display: flex;
  @media(min-width:800px){
    justify-content:space-between;
  }
`;

const Vencimento = styled.input`
  &:focus{
        outline-color: #080;
      }

  &:focus:invalid{
    outline-color:#FF0000;
  }

  width: 152px;
  height: 40px;
  margin-right: 15px;
  margin-bottom: 36px;

  @media(min-width:800px){
    width: 200px;
  }
`;

const CVV = styled.input`
  &:focus{
    outline-color: #080;
  }

  &:focus:invalid{
    outline-color:#FF0000;
  }
  
  width: 94px;
  height: 40px;
  @media(min-width:800px){
    width: 100px;
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
  margin-top: 30px;

  @media(min-width:800px){
    margin-top: 70px;
    font-size: 23px;
  }
`;

const InputCpf = styled.input`
  margin-bottom: 36px;
  background: #f3eed9;
  box-shadow: inset 0px 0px 2px #4e0000;
  border-radius: 8px;
  width: 261px;
  height: 40px;

  &:focus{
      outline-color: #080;
    }

  &:focus:invalid{
    outline-color:#FF0000;
  }

  @media(min-width:800px){
    width: 370px;
  }
`;

const Submit = styled.button`
  position: absolute;
  bottom: 0px;
  width: 337px;
  height: 47px;
  margin-top: 20px;
  margin-bottom: 35px;
  @media (min-width: 800px) {
    position: relative;
  }
`;

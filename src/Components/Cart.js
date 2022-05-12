import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext ";
import Header from "./Header/Header";

export default function Cart() {
  const { userInfos } = useContext(UserContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  console.log(cart);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "http://localhost:5000";
    async function getCart() {
      try {
        const cart = await axios.get(`${URL}/cart`, config);
        let somatorio = 0;
        let somatorioItem = 0;
        setCart(cart.data);
        cart.data.forEach((cart) => {
          somatorio += cart.value * cart.quant;
          somatorioItem += cart.quant;
        });
        setTotalItems(somatorioItem);
        setTotal(somatorio);
      } catch (e) {
        console.log("Houve problema na requisição do carrinho" + e);
        // alert("A sessão está expirada, logue novamente");
        // navigate("/");
      }
    }
    getCart();
  }, [userInfos.token, navigate]);

  return (
    <>
      <Header />
      <CartSection>
        <button>Fechar compra ({totalItems} Itens)</button>
        {cart?.map((cart) => {
          return (
            <div id={cart._id}>
              <img src={cart.image} alt=""></img>
              <article>
                <h2>{cart.name}</h2>
                <h3>R$ {cart.value}</h3>
                <ContainerQuant>
                  <ion-icon name="remove-circle"></ion-icon>
                  <p>{cart.quant}</p>
                  <ion-icon name="add-circle"></ion-icon>
                </ContainerQuant>
              </article>
              <ion-icon name="trash-bin"></ion-icon>
            </div>
          );
        })}
        <footer>
          <p>Subtotal</p>
          <p>R$ {total}</p>
        </footer>
      </CartSection>
    </>
  );
}

const CartSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 16px;
    width: 337px;
    height: 47px;
  }

  div {
    display: flex;
    width: 338px;
    height: 146px;
    background: #f3eed9;
    border-radius: 5px;
    margin-top: 13px;
    position: relative;
  }

  img {
    width: 87px;
    height: 125px;
    border-radius: 5px;
    margin-top: 11px;
    margin-left: 10px;
  }

  h2 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #4e0000;
    margin-left: 9px;
  }

  h3 {
    font-family: "Lexend Deca";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #ec665c;
    margin-left: 13px;
  }

  div p {
    font-family: "Fredoka One";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #4e0000;
  }

  ion-icon {
    color: #4e0000;
    font-size: 25px;
    margin-bottom: 13px;
    position: absolute;
    bottom: 0;
    right: 7px;
    visibility: visible;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f3eed9;
    box-shadow: 0px -7px 4px rgba(0, 0, 0, 0.25);
    height: 51px;
    font-family: "Fredoka One";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    color: #4e0000;
    margin-top: 15px;
  }
`;

const ContainerQuant = styled.table`
  position: absolute;
  bottom: 0;
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
  ion-icon {
    position: relative;
    margin-left: 15px;
  }
  p {
    margin-top: 2px;
  }
`;

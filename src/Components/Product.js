import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";

import { UserContext } from "../Context/UserContext ";
import Header from "./Header/Header";

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfos } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "http://localhost:5000";
    async function getProduct() {
      try {
        const promise = await axios.get(`${URL}/product/${id}`, config);
        setProduct(promise.data);
      } catch (e) {
        console.log("Houve problema na requisição do produto" + e);
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
    getProduct();
  }, [id, userInfos.token, navigate]);

  async function handleButton() {
    const URL = "http://localhost:5000";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    try {
      await axios.put(`${URL}/addProduct/${id}`, null, config);
      Swal.fire({
        icon: "success",
        title: "Produto Adicionado ao Carrinho",
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000",
      });
      navigate("/");
    } catch (e) {
      console.log("Houve um problema ao adicionar o item ao carrinho" + e);
      Swal.fire({
        icon: "error",
        title: "Ops! Algo deu Errado",
        text: "Tente Novamamente Mais Tarde",
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000",
      });
    }
  }

  return (
    <>
      <Header />
      <ProductSection>
        <h1>{product[0]?.name}</h1>
        <img src={product[0]?.image} alt=""></img>
        <h2>R$ {product[0]?.value?.toString().replace(".", ",")}</h2>
        <div>
          <p>{product[0]?.description}</p>
        </div>

        <button
          onClick={() => {
            handleButton();
          }}
        >
          Adicionar ao Carrinho
        </button>
      </ProductSection>
    </>
  );
}

const ProductSection = styled.section`
  font-family: "Lexend Deca";
  font-style: normal;
  color: #f3eed9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 23px;
    margin-bottom: 14px;
  }
  img {
    width: 184px;
    height: 265px;
    border-radius: 5px;
  }
  h2 {
    font-weight: 700;
    font-size: 40px;
    line-height: 50px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 14px;
    margin-bottom: 18px;
  }
  div {
    width: 90%;
    text-align: justify;
    max-width: 500px;
    max-height: 95px;
    overflow: scroll;
    //Bruno: Adicionei umas propriedades para a descrição ficar alinhada
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    //Bruno: Percebi no layout q fiz q o botão tava muito longe da descrição no mobile, diminui um pouco
  }
  button {
    width: 337px;
    height: 47px;
    margin-top: 20px;
    margin-bottom: 15px;
    //Bruno: Removi algumas propriedas porque coloquei como global para todos os botões.
  }
`;

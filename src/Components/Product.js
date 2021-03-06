import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";

import { UserContext } from "../Context/UserContext ";
import Header from "./Header/Header";

export default function Product() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [productState, setProductState] = useState(false);

  const { id } = useParams();
  const { userInfos } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "https://projeto14-comic-heart.herokuapp.com";
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
    setProductState(true);
    const URL = "https://projeto14-comic-heart.herokuapp.com";
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
      setProductState(false);
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
      setProductState(false);
    }
  }
  console.log(Object.keys(product).length)

  return !(Object.keys(product).length === 0) ?
    <>
      <Header />
      <ProductSection>
        <h1>{product[0]?.name}</h1>
        <img src={product[0]?.image} alt=""></img>
        <h2>R$ {product[0]?.value?.toString().replace(".", ",")}</h2>
        <div className="product">
          <p>{product[0]?.description}</p>
        </div>

        <button
          onClick={() => {
            handleButton();
          }}
          disabled={productState}
        >
          {!productState ? "Adicionar ao Carrinho" : <Bars width={50} color="#F3EED9" />}
        </button>
      </ProductSection>
    </>
    :
    <Bars height={500} width={100} color="#F3EED9" />
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

    @media(min-width: 800px){
      width: 264px;
      height: 365px;
    }
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

  .product {
    width: 90%;
    text-align: justify;
    max-width: 500px;
    max-height: 95px;
    overflow: auto;
    padding: 5px;

    @media(min-width: 800px){
      max-height: 500px;
      max-width: 1120px;
      overflow:visible;
    }

    &::-webkit-scrollbar{
      width:10px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey; 
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #f3eed9; 
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #daca8b; 
    }
  }

  
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  button {
    width: 337px;
    height: 47px;
    margin-top: 20px;
    margin-bottom: 15px;
    display:flex;
    align-items:center;
    justify-content:center;
  }
`;

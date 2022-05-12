import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext ";

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
      }
    }
    getProduct();
  }, [id, userInfos.token]);

  async function handleButton() {
    const URL = "http://localhost:5000";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    try {
      const promise = await axios.put(`${URL}/addProduct/${id}`, null, config);
      //TODO ALLAN - ALERT DE ACORDO COM A BIBLIOTECA DO BRUNO.
      console.log(promise.data);
      alert(promise.data);
      navigate("/");
    } catch (e) {
      console.log("Houve um problema ao adicionar o item ao carrinho" + e);
      //AQUI TAMBÉM
      alert("Ocorreu um erro na adição ao carrinho :(");
    }
  }

  return !product ? (
    <p>Loading</p>
  ) : (
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
    width: 65%;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
  button {
    width: 337px;
    height: 47px;
    box-shadow: inset 0px 0px 2px #4e0000;
    border-radius: 8px;
  }
`;

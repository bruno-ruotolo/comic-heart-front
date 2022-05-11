import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = "http://localhost:5000";
    async function getProduct() {
      try {
        const promise = await axios.get(`${URL}/product/${id}`);
        setProduct(promise.data);
      } catch (e) {
        console.log("Houve problema na requisição do produto" + e);
      }
    }
    getProduct();
  }, []);

  async function handleButton() {
    const URL = "http://localhost:5000";
    try {
      const promise = await axios.put(`${URL}/product/${id}`);
      //TODO encaminhar para a página listagem de produtos
      navigate("/");
    } catch (e) {
      console.log("Houve um problema ao adicionar o item ao carrinho" + e);
    }
  }

  return (
    <ProductSection>
      <h1>{product.name}</h1>
      <img src={product.image} alt=""></img>
      <h2>{product.value}</h2>
      <p>{product.description}</p>

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

const ProductSection = styled.section``;

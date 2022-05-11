import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
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

  return (
    <ProductSection>
      <h1>{product.name}</h1>
      <img src={product.image} alt=""></img>
      <h2>{product.value}</h2>
      <p>{product.description}</p>

      <button onClick={() => {}}>Adicionar ao Carrinho</button>
    </ProductSection>
  );
}

const ProductSection = styled.section``;

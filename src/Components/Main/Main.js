import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { UserContext } from "../../Context/UserContext ";
import Header from "../Header/Header";
import ProductComponent from "./ProductComponent";

export default function Main() {
  const location = useLocation();

  const { userInfos } = useContext(UserContext);
  const { state } = location;

  const [products, setProducts] = useState([])

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "http://localhost:5000"

    if (state) {
      const { search } = state;
      getProducts(search, config, URL)
    } else {
      getProducts(undefined, config, URL)
    }
  }, [userInfos.token, state]);

  function getProducts(query, config, URL) {
    let promise;
    if (query) {
      promise = axios.get(`${URL}/main?s=${query}`, config)
    } else {
      promise = axios.get(`${URL}/main`, config)
    }
    promise.then(response => {
      setProducts(response.data);
    });

    promise.catch(e => console.log(e))
  }

  return (
    <>
      <Header />
      <ProductsList>
        {products.map(({ name, value, description, image }, index) => {
          return (
            <ProductComponent
              key={index}
              name={name.length > 23 ? name.slice(0, 23) + "..." : name}
              value={value.toString().replace(".", ",")}
              description={description.length > 100 ? description.slice(0, 100) + "..." : description}
              image={image}
            />
          )
        })}
      </ProductsList>
    </>
  )
}

const ProductsList = styled.main`
  display:flex;
  flex-direction:column;
  align-items:center;
  height: 100vh;
  width: 100vw;
  max-width: 1000px;
  margin-top: 87px;
`
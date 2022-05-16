import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";

import { UserContext } from "../../Context/UserContext ";
import Header from "../Header/Header";
import ProductComponent from "./ProductComponent";

export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfos } = useContext(UserContext);
  const { state } = location;

  const [products, setProducts] = useState([]);
  const [productsState, setProductsState] = useState(false);


  useEffect(() => {
    setProductsState(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "https://projeto14-comic-heart.herokuapp.com"

    if (state) {
      const { search } = state;
      getProducts(search, config, URL)
    } else {
      getProducts(undefined, config, URL)
    }

    function getProducts(query, config, URL) {
      let promise;
      if (query) {
        promise = axios.get(`${URL}/main?s=${query}`, config)
      } else {
        promise = axios.get(`${URL}/main`, config)
      }
      promise.then(response => {
        setProductsState(false);
        setProducts(response.data);
      });

      promise.catch(e => {
        Swal.fire({
          icon: "warning",
          title: "Sessão Experidada",
          text: 'Faça Login Novamente',
          width: 326,
          background: "#F3EED9",
          confirmButtonColor: "#4E0000",
          color: "#4E0000"
        });
        navigate("/");
        console.log(e)
      })
    }

  }, [userInfos.token, state, navigate]);


  return !productsState ? (
    products.length > 0 ? (
      <>
        <ProductsList>
          <Header />
          {products.map(({ name, value, description, image, _id }) => {
            return (
              <ProductComponent
                key={_id}
                _id={_id}
                name={name.length > 23 ? name.slice(0, 23) + "..." : name}
                value={value.toString().replace(".", ",")}
                description={description.length > 100 ? description.slice(0, 100) + "..." : description}
                image={image}
              />
            )
          })}
        </ProductsList>
      </>
    ) : <ProductsList>
      <Header />
      <h3>Nenhum Produto Encontrado</h3>
    </ProductsList>
  ) :
    <Bars height={500} width={100} color="#F3EED9" />
}

const ProductsList = styled.main`
    display:flex;
    flex-direction:column;
    align-items:center;
    height: calc(100vh - 90px);
    width: 100vw;
    max-width: 1465px;
    margin-top: 87px;

    h3 {
      margin-top: 200px;
      font-family: 'Fredoka One', cursive;
      font-weight: 400;
      font-size: 20px;
      line-height: 19px;
      color: #F3EED9;
    }

  @media(min-width:800px){
    width:100vw;
    padding: 0 15px;
    height: fit-content;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
  }
`
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import Swal from "sweetalert2"

import { UserContext } from "../../Context/UserContext "

import LogoHQ from "./LogoSemTexto.png"

export default function Header() {
  const navigate = useNavigate();

  const { userInfos } = useContext(UserContext);

  const [search, setSearch] = useState()
  const [cart, setCart] = useState(0)

  useEffect(() => {
    let unmounted = false;
    let quantity = 0;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`
      }
    }
    const URL = "http://localhost:5000"
    const promise = axios.get(`${URL}/header`, config);
    promise.then(response => {
      const cartArr = response.data;
      if (cartArr.length > 0) {
        cartArr.forEach(cartQuant => {
          quantity += cartQuant.quant
        });
      }
      if (!unmounted) setCart(quantity);
    });
    promise.catch(e => {
      Swal.fire({
        icon: "error",
        title: "Algo deu Errado",
        text: 'Tente Novamamente Mais Tarde',
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000"
      })
      console.log(e)
    });
    return () => unmounted = true
  }, [userInfos.token])


  function handleInput(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/main", { state: { search } })
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <HeaderStyle>
      <HeaderSection>
        <TopHeader>
          <img src={LogoHQ} alt="Logo" onClick={() => navigate("/main")} />
          <HeaderInput>
            <form onSubmit={handleSubmit}>
              <input type="text" onChange={(e) => handleInput(e)} />
              <ion-icon onClick={handleSubmit} type="buttom" name="search"></ion-icon>
            </form>
          </HeaderInput>
          <Cart onClick={() => navigate("/cart")}>
            <ion-icon name="cart"></ion-icon>
            <CartQuantity cart={cart}>
              <p>{cart}</p>
            </CartQuantity>
          </Cart>
        </TopHeader>
        <BottomHeader>
          <UserIcon>
            <ion-icon name="person"></ion-icon>
            <p>{userInfos.name}</p>
          </UserIcon>
          <ion-icon onClick={handleLogout} name="log-out"></ion-icon>
        </BottomHeader>
      </HeaderSection>
    </HeaderStyle >
  )
}

const HeaderStyle = styled.header`
  position:fixed;
  top: 0;
  left: 0;
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  width: 100vw;
  height: 70px;
  background-color: #F3EED9;
  box-shadow: 0px 12px 7px rgba(0, 0, 0, 0.25);

  ion-icon{ 
    color:#4E0000;
    font-size: 60px;
    margin-right: 5px;
  }
`

const HeaderSection = styled.section`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width: 100%;
  max-width: 1720px;
`
const TopHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 100%;
  margin-top: 5px;

  ion-icon {
    font-size: 45px;
  }
`

const HeaderInput = styled.div`
  position: relative;

  input {
    width: 255px; 
    height: 38px;
    background-color: #4E0000;
    color:#F3EED9;
    padding-left: 45px;
    font-size: 17px;
  }
  
  ion-icon {
    position: absolute;
    top:0;
    left:0;
    color: #F3EED9;
    font-size: 33px;
    margin: 4px 4px;
  }

  button {
    border:none;
    color:transparent;
    background-color:transparent;
  }
`

const Cart = styled.div`
  position: relative;
`

const CartQuantity = styled.div`
  visibility: ${({ cart }) => cart > 0 ? "visible" : "hidden"};
  position: absolute;
  bottom:2px;
  left: 4px;
  width: 22px;
  height: 22px;
  background-color: #EC665C;
  border-radius: 50px;
  display:flex;
  align-items:center;
  justify-content:center;

  p {
    font-family: 'Fredoka One', cursive;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #4E0000;
  }
`

const BottomHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-around;
  width:100%;
  margin-top: -8px;

  ion-icon {
    font-size: 30px;
    margin-left: 15px;
  }
`
const UserIcon = styled.div`
  display:flex;
  align-items:center;
  height: 100%;
  margin-right: 70px;

 ion-icon {
    font-size: 20px;
  }

  p {
    font-family: 'Fredoka One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    color: #4E0000;
  }
`


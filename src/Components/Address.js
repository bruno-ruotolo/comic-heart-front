import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";

import { UserContext } from "../Context/UserContext ";

export default function Address() {
  const navigate = useNavigate();

  const { userInfos } = useContext(UserContext);

  const [address, setAddress] = useState({
    cep: "",
    city: "",
    uf: "",
    address: "",
    number: "",
    complement: "",
    reference: ""
  });

  const [addressState, setAddressState] = useState(false);
  const [hideClear, setHideClear] = useState(false);

  useEffect(() => {
    setAddressState(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "https://projeto14-comic-heart.herokuapp.com";

    const promise = axios.get(`${URL}/address`, config);
    promise.then(({ data }) => {
      if (data) {
        setAddress(data);
        setHideClear(true);
        setAddressState(true);
      } else {
        setAddressState(false);
      }

      //Rodar a API de CEP
    });

    promise.catch(e => {
      setAddressState(false);
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
    });
  }, [navigate, userInfos.token]);

  function handleInput(e, property) {
    if (property === "cep") {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d{3})/, "$1-$2");
    }

    if (property === "uf") e.target.value = e.target.value.toUpperCase()

    setAddress({ ...address, [property]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAddressState(true);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "https://projeto14-comic-heart.herokuapp.com";

    const promise = axios.post(`${URL}/address`, address, config)
    promise.then(response => {
      navigate("/checkout");
    });
    promise.catch((e) => {
      if (e.response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Sessão Experidada",
          text: "Faça Login Novamente",
          width: 326,
          background: "#F3EED9",
          confirmButtonColor: "#4E0000",
          color: "#4E0000",
        });
      } else {
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
      console.log(e)
      setAddressState(false);
    });
  }

  function clearData() {
    const clearedAddres = {
      cep: "",
      city: "",
      uf: "",
      address: "",
      number: "",
      complement: "",
      district: "",
      reference: ""
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userInfos.token}`,
      },
    };
    const URL = "https://projeto14-comic-heart.herokuapp.com";
    const promise = axios.delete(`${URL}/address`, config)
    promise.then(response => { setAddress(clearedAddres); setHideClear(false) });
    promise.catch(e => {
      Swal.fire({
        icon: "error",
        title: "Ops! Algo deu Errado",
        text: "Tente Novamamente Mais Tarde",
        width: 326,
        background: "#F3EED9",
        confirmButtonColor: "#4E0000",
        color: "#4E0000",
      });
    })
    setAddressState(false);
  }

  function viaCep(e) {
    const cep = e.target.value;
    if (cep.length < 9) return;
    const promise = axios.get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
    promise.then(({ data }) => {
      if (data.erro) {
        setAddress({
          ...address,
          cep,
          city: "",
          uf: "",
          address: "",
          number: "",
          complement: "",
          district: "",
          reference: ""
        })
      }
      else {
        const { cep, bairro: district, localidade: city, uf, logradouro: address } = data;
        setAddress({ ...address, cep, district, city, uf, address });
      }
    });
    promise.catch(e => console.log(e));
  }

  console.log(addressState)
  return (
    <AddressSection>
      <AddressHeader>
        <ion-icon onClick={() => navigate("/cart")} name="caret-back"></ion-icon>
        <h2>Endereço de Entrega</h2>
        <p>Verifique todos os dados antes de enviar</p>
      </AddressHeader>
      <AddressInputs>
        <p>Campos com * são obrigatórios</p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            maxLength="9"
            placeholder="CEP*"
            pattern="^(\d{5})-(\d{3})"
            onBlur={viaCep}
            value={address.cep || ""}
            onChange={(e) => handleInput(e, "cep")}
            required
            disabled={addressState}
          />
          <AddressCity>
            <input
              type="text"
              placeholder="Cidade*"
              value={address.city || ""}
              onChange={(e) => handleInput(e, "city")}
              required
              disabled={addressState}
            />

            <input
              type="text"
              placeholder="UF*"
              maxLength="2"
              pattern="[A-Z]{2}"
              value={address.uf || ""}
              onChange={(e) => handleInput(e, "uf")}
              required
              disabled={addressState}
            />
          </AddressCity>
          <input
            type="text"
            placeholder="Endereço (Rua, Avenida, etc)*"
            value={address.address || ""}
            onChange={(e) => handleInput(e, "address")}
            required
            disabled={addressState}
          />
          <input
            type="text"
            placeholder="Bairro*"
            value={address.district || ""}
            onChange={(e) => handleInput(e, "district")}
            required
            disabled={addressState}
          />

          <AddressHouse>
            <input
              type="number"
              placeholder="Número*"
              value={address.number || ""}
              onChange={(e) => handleInput(e, "number")}
              required
              disabled={addressState}
            />

            <input
              type="text"
              placeholder="Complemento*"
              value={address.complement || ""}
              onChange={(e) => handleInput(e, "complement")}
              required
              disabled={addressState}
            />
          </AddressHouse>

          <input
            type="text"
            placeholder="Referência"
            value={address.reference || ""}
            onChange={(e) => handleInput(e, "reference")}
            disabled={addressState}
          />

          <ClearAddress hideClear={hideClear} onClick={clearData}>
            <span>Novo Endereço</span>
          </ClearAddress>
          <button disabled={hideClear ? !addressState : addressState}>
            {!addressState || hideClear ? "Ir para o Pagamento" : <Bars width={50} color="#F3EED9" />}
          </button>
        </form>
      </AddressInputs>
    </AddressSection>
  )
}

const AddressSection = styled.section`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  @media(min-width:800px){
    width:100vw;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 95%;
    text-align: center;
    color: #F3EED9;
    margin-bottom: 10px;
  }
`

const AddressHeader = styled.header`
  display:flex;
  flex-direction:column;
  margin-bottom: 25px;

  ion-icon{
    position: absolute;
    left: 10px;
    top: 3px;
    font-size: 35px;
    color: #F3EED9;
    text-shadow: inset 0px 5px 4px rgba(78, 0, 0, 0.25);
    cursor:pointer;

    @media(min-width:800px){
      top: 26px;
      left: 40px;
    }
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 15px;
    font-family: 'Fredoka One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 95%;
    text-align: center;
    color: #F3EED9;
  }
`

const AddressInputs = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 303px;
  width: 100%;

  @media(min-width:800px){
    max-width: 503px;
  }

  
  form {
    display:flex;
    align-items:center;
    justify-content:center;
  }

  input {
    width: 303px;
    height:40px;
    margin-bottom: 20px;

    &:focus{
      outline-color: #080;
    }

    &:focus:invalid{
      outline-color:#FF0000;
    }

    &::placeholder{
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 95%;
    }

    @media(min-width:800px){
      width: 503px;
    }
  }


  button {
    position: absolute;
    bottom:0px;
    width: 337px;
    height: 47px;
    margin-top:20px;
    margin-bottom: 35px;
    @media(min-width:800px){
      position: relative;
    }
  }
`

const AddressCity = styled.div`
  display:flex;
  width: 100%;
  align-items:center;
  justify-content:space-between;

  @media(min-width:800px){
    width: 100%;
  }

  input:first-child {
    width:216px;
    @media(min-width:800px){
      width: 356px;
    }
  }

  input:last-child {
    width:79px;
    @media(min-width:800px){
      width: 120px;
    }
  }
`

const AddressHouse = styled.div`
  display:flex;
  width: 100%;
  align-items:center;
  justify-content:space-between;

  input:first-child {
    width:89px;
    padding-left: 15px;
    @media(min-width:800px){
      width: 140px;
    }
  }

  input:last-child {
    width:208px;
    @media(min-width:800px){
      width: 335px;
    }
  } 
`

const ClearAddress = styled.div`
  display: ${({ hideClear }) => hideClear ? "flex" : "none"};
  align-items:center;
  justify-content:center;
  width:128px;
  height:35px;
  background-color: #F3EED9;
  box-shadow: inset 0px 0px 2px #4E0000;
  border-radius: 8px;
  cursor: pointer;

  span {
    font-family: 'Fredoka One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #EC665C;
  }
`
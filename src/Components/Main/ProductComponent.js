import styled from "styled-components";

export default function ProductComponent({ name, value, description, image }) {
  return (
    <ProductSection>
      <img src={image} alt="Comic" />
      <ComicInfos>
        <h2>{name}</h2>
        <strong>{`R$${value}`}</strong>
        <p>{description}</p>
      </ComicInfos>
    </ProductSection>
  )
}

const ProductSection = styled.section`
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding: 10px;
  background-color: #F3EED9;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 350px;
  height: 177px;

  img {
    width: 109;
    height: 157px;
    border-radius: 5px;
  }
`

const ComicInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  height: 100%;
  width: 100%;
  margin-left: 10px;
  overflow: hidden;

  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 25px;
    text-align: center;
    color: #4E0000;
    margin-bottom: 5px;
  }

  strong {
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 25px;
    color: #EC665C;
    text-align: left;
    margin-bottom: 5px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: justify;
    color: #4E0000;
    max-width: 195px;
  }
`
import styled from "styled-components";
// import { Link } from "react-router-dom";

export const Screen = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  background-color: white;
  position: absolute;
  top: 200px;
  left: 25%;
  width: 50%;
  height: fit-content;
  box-shadow: 5px 5px 10px;
  padding: 20px;
  display: grid;
  gap: 20px;
  animation-name: animatescale;
  animation-duration: 0.5s;

  @keyframes animatescale {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: bolder;
  width: 100%;
`;

export const Body = styled.div`
  font-size: 18px;
  width: 100%;
`;

export const GoToArticle = styled.div`
  width: 100%;
  text-align: center;
`;

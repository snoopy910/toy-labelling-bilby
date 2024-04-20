import styled from "styled-components";

export const Screen = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
`;

export const Container = styled.div`
  position: fixed;
  top: 300px;
  left: 30%;
  width: 40%;
  background-color: white;
  height: fit-content;
  box-shadow: 5px, 5px, 10px;
  padding: 20px;
  display: grid;
  gap: 20px;
`;

export const Title = styled.div`
  font-size: 48px;
`;

export const Body = styled.div``;

export const ControllerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

export const SaveButton = styled.button``;

export const CancelButton = styled.button``;

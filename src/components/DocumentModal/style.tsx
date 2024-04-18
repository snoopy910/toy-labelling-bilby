import styled from "styled-components";
// import { Link } from "react-router-dom";

export const Screen = styled.div`
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  background-color: white;
  position: fixed;
  top: 200px;
  left: 25%;
  width: 50%;
  height: fit-content;
  box-shadow: 5px 5px 10px;
  padding: 20px;
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
export const LabelContainer = styled.div``;
export const Label = styled.div``;
export const LabelInput = styled.div``;
export const LabelBox = styled.div``;
export const GoToArticle = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;
export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
export const MoveController = styled.div`
  display: flex;
  gap: 5px;
`;
export const First = styled.button`
  border-radius: 50%;
`;
export const Prev = styled.button`
  border-radius: 50%;
`;
export const Next = styled.button`
  border-radius: 50%;
`;
export const Last = styled.button`
  border-radius: 50%;
`;
export const SaveReset = styled.div`
  display: flex;
  gap: 5px;
`;
export const SaveButton = styled.button``;
export const ResetButton = styled.button``;
export const CloseButton = styled.button``;

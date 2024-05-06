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

export const LabelContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-evenly;
`;

export const LabelSide = styled.div`
  display: grid;
  grid-auto-rows: 40px;
  gap: 10px;
`;

export const Label = styled.label``;

export const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LabelInput = styled.input`
  border: none;
  border-radius: 1rem;
  background-color: #d8d8d8;
  font-size: 16px;
  padding: 10px 20px;
  &:focus {
    outline: none;
  }
`;

export const LabelBox = styled.div`
  width: 30%;
  max-height: 200px;
  overflow: auto;
`;

export const LabelItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RemoveButton = styled.button`
  background-color: #e4e4e4;
  border: none;
  margin: 5px;
  padding: 5px;
  border-radius: 100%;
`;

export const CloseSVG = styled.img`
  width: 20px;
  height: 15px;
`;

export const GoToArticle = styled.div`
  width: 100%;
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

export const SuggestButton = styled.button``;

export const SaveButton = styled.button``;

export const ResetButton = styled.button``;

export const CloseButton = styled.button``;

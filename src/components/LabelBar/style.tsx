import styled from "styled-components";

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

export const SuggestButton = styled.button``;

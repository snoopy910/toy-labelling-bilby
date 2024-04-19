import styled from "styled-components";

export const Setter = styled.div`
  position: relative;
  display: inline-block;
`;

export const Container = styled.div`
  position: fixed;
  display: grid;
  width: 300px;
  height: 200px;
  background-color: white;
  box-shadow: 5px 5px 10px;
  transition: 3s ease-in;
  padding: 10px;
  justify-items: flex-end;
`;

export const SuggestButton = styled.button`
  display: flex;
  width: 100%;
  text-align: left;
  justify-content: space-between;
`;

export const TickShow = styled.img`
  width: 15px;
  height: 15px;
`;

export const ListItem = styled.div`
  overflow: auto;
  width: 100%;
`;

export const ConfirmButton = styled.button`
  width: fit-content;
  margin-top: 20px;
`;

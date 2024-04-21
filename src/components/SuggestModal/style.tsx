import styled from "styled-components";

export const Setter = styled.div`
  position: relative;
  display: inline-block;
`;

export const Container = styled.div<{ $isvisible: boolean }>`
  position: fixed;
  display: grid;
  width: 250px;
  height: 200px;
  background-color: white;
  box-shadow: 5px 5px 10px;
  padding: 10px;
  justify-items: flex-end;
  /* animation-name: animatedown; */
  animation-duration: 1s;
  transition: opacity 0.5s ease-out, height 0.5s ease-out;
  animation-name: ${(props) =>
    props.$isvisible ? "animatedown" : "animateup"};

  @keyframes animatedown {
    from {
      position: relative;
      height: 0px;
      opacity: 0;
    }
    to {
      position: relative;
      height: 200px;
      opacity: 1;
    }
  }

  @keyframes animateup {
    from {
      position: relative;
      height: 200px;
      opacity: 1;
    }
    to {
      position: relative;
      height: 0px;
      opacity: 0;
    }
  }
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

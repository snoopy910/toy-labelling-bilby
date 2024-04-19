import React, { useState } from "react";
import {
  Setter,
  Container,
  ListItem,
  SuggestButton,
  TickShow,
  ConfirmButton,
} from "./style";
import { SuggestLabels } from "../../consts/suggests";
import CheckMark from "../../assets/check-mark.svg";

interface SuggestPropsType {
  onConfirm: (labels: string[] | undefined) => void;
}

export const SuggestModal: React.FC<SuggestPropsType> = ({ onConfirm }) => {
  const [isTickShow, SetIsTickShow] = useState<boolean[]>(
    Array(SuggestLabels.length).fill(false)
  );

  const handleClickItem = (id: number) => {
    const temp = isTickShow.map((show, index) => (index === id ? !show : show));
    SetIsTickShow(temp);
  };

  const handleOK = () => {
    let suggests: string[] = [];
    SuggestLabels.map((label, index) => {
      if (isTickShow[index]) suggests.push(label);
    });
    onConfirm(suggests);
  };

  return (
    <Setter>
      <Container>
        <ListItem>
          {SuggestLabels.map((label, index) => (
            <SuggestButton onClick={() => handleClickItem(index)}>
              {label}
              {isTickShow[index] && (
                <TickShow src={CheckMark} alt="CheckMark" />
              )}
            </SuggestButton>
          ))}
        </ListItem>
        <ConfirmButton onClick={handleOK}>OK</ConfirmButton>
      </Container>
    </Setter>
  );
};

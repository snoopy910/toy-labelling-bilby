import React, { useState, useRef } from "react";
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
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";

interface SuggestPropsType {
  onConfirm: (labels: string[] | undefined) => void;
  onClose: () => void;
}

export const SuggestModal: React.FC<SuggestPropsType> = ({
  onConfirm,
  onClose,
}) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, onClose);

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
      <Container ref={ref}>
        <ListItem>
          {SuggestLabels.map((label, index) => (
            <SuggestButton onClick={() => handleClickItem(index)} key={index}>
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

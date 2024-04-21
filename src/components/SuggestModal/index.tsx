import React, { useState, useRef } from "react";
import {
  Setter,
  Container,
  ListItem,
  SuggestButton,
  TickShow,
  ConfirmButton,
} from "./style";
import CheckMark from "../../assets/check-mark.svg";
import { SuggestLabels } from "../../consts/suggests";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";

interface SuggestPropsType {
  isVisible: boolean;
  onConfirm: (labels: string[] | undefined) => void;
  onClose: () => void;
}

export const SuggestModal: React.FC<SuggestPropsType> = ({
  isVisible,
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
    const suggests: string[] = [];
    SuggestLabels.map((label, index) => {
      if (isTickShow[index]) suggests.push(label);
    });
    onConfirm(suggests);
  };

  return (
    <Setter>
      <Container ref={ref} $isvisible={isVisible}>
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

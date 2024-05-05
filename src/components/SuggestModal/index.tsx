import React, { useState, useRef, useEffect } from "react";
import {
  Setter,
  Container,
  ListItem,
  SuggestButton,
  TickShow,
  ModalFooter,
  ConfirmButton,
  Loader,
} from "./style";
import CheckMark from "../../assets/check-mark.svg";
import { SuggestLabels } from "../../consts";
import { useOutsideAlerter } from "../../hooks";

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

  const [suggestedLabels, setSuggestedLabels] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      const shuffledArray = SuggestLabels.sort(() => 0.5 - Math.random());
      const numElements = Math.floor(Math.random() * 3) + 3;
      setSuggestedLabels(shuffledArray.slice(0, numElements));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <ListItem>
            {suggestedLabels.map((label, index) => (
              <SuggestButton onClick={() => handleClickItem(index)} key={index}>
                {label}
                {isTickShow[index] && (
                  <TickShow src={CheckMark} alt="CheckMark" />
                )}
              </SuggestButton>
            ))}
          </ListItem>
        ) : (
          <Loader />
        )}
        <ModalFooter>
          <ConfirmButton onClick={handleOK}>OK</ConfirmButton>
        </ModalFooter>
      </Container>
    </Setter>
  );
};

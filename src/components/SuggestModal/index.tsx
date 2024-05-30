import React, { useState, useRef, useEffect } from "react";
import CheckMark from "assets/check-mark.svg";
import { Loader } from "components";
import { useFetchSuggestLabelsWithQuery, useOutsideAlerter } from "hooks";
import {
  Setter,
  Container,
  ListItem,
  SuggestButton,
  TickShow,
  ModalFooter,
  ConfirmButton,
} from "./style";

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
  const { data, isLoading } = useFetchSuggestLabelsWithQuery();

  const ref = useRef(null);
  useOutsideAlerter(ref, onClose);

  useEffect(() => {
    if (!isLoading) {
      setIsTickShow(Array(data.length).fill(false));
    }
  }, [data, isLoading]);

  const [isTickShow, setIsTickShow] = useState<boolean[]>([]);

  const handleClickItem = (id: number) => {
    const temp = isTickShow.map((show, index) => (index === id ? !show : show));
    setIsTickShow(temp);
  };

  const handleOK = () => {
    const suggests: string[] = [];
    data.map((label: { label: string }, index: number) => {
      if (isTickShow[index]) suggests.push(label.label);
    });
    onConfirm(suggests);
  };

  return (
    <Setter>
      <Container ref={ref} $isvisible={isVisible}>
        {!isLoading ? (
          <ListItem>
            {data.map((label: { label: string }, index: number) => (
              <SuggestButton onClick={() => handleClickItem(index)} key={index}>
                {label.label}
                {isTickShow[index] ? (
                  <TickShow src={CheckMark} alt="CheckMark" />
                ) : (
                  <></>
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

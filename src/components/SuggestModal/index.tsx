import React, { useState, useRef, useEffect } from "react";
import CheckMark from "assets/check-mark.svg";
import { Loader } from "components";
import { useFetchSuggestLabels, useOutsideAlerter } from "hooks";
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
  const [fetchedSuggestLabels, fetchSuggestLabels] = useFetchSuggestLabels();

  const ref = useRef(null);
  useOutsideAlerter(ref, onClose);

  useEffect(() => {
    fetchSuggestLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsTickShow(Array(fetchedSuggestLabels.suggestLabels.length).fill(false));
  }, [fetchedSuggestLabels]);

  const [isTickShow, setIsTickShow] = useState<boolean[]>([]);

  const handleClickItem = (id: number) => {
    const temp = isTickShow.map((show, index) => (index === id ? !show : show));
    setIsTickShow(temp);
  };

  const handleOK = () => {
    const suggests: string[] = [];
    fetchedSuggestLabels.suggestLabels.map((label, index) => {
      if (isTickShow[index]) suggests.push(label);
    });
    onConfirm(suggests);
  };

  return (
    <Setter>
      <Container ref={ref} $isvisible={isVisible}>
        {!fetchedSuggestLabels.loading ? (
          <ListItem>
            {fetchedSuggestLabels.suggestLabels.map((label, index) => (
              <SuggestButton onClick={() => handleClickItem(index)} key={index}>
                {label}
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

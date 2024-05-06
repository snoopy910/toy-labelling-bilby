import React, { useState } from "react";
import {
  LabelContainer,
  Label,
  LabelSide,
  StyledLabel,
  LabelInput,
  SuggestButton,
  LabelBox,
  LabelItem,
  RemoveButton,
  CloseSVG,
} from "./style";
import CloseMark from "../../assets/close-mark.svg";
import { SuggestModal } from "../../components";

interface LabelBarPropsType {
  labels: string[] | undefined;
  setLabels: (labels: string[] | undefined) => void;
}

export const LabelBar: React.FC<LabelBarPropsType> = ({
  labels,
  setLabels,
}) => {
  const [label, setLabel] = useState<string>("");

  const [isSuggestOpen, setIsSuggestOpen] = useState<boolean>(false);
  const [isSuggestVisible, setIsSuggestVisible] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLabels([...(labels || []), label]);
      setLabel("");
    }
  };

  const handleClickSuggest = () => {
    setIsSuggestVisible(true);
    setIsSuggestOpen(true);
  };

  const handleSuggest = (suggests: string[] | undefined) => {
    setLabels([...(labels || []), ...(suggests || [])]);
    setIsSuggestVisible(false);
    setTimeout(() => {
      setIsSuggestOpen(false);
    }, 480);
  };

  const handleSuggestClose = () => {
    setIsSuggestVisible(false);
    setTimeout(() => {
      setIsSuggestOpen(false);
    }, 480);
  };

  const handleRemove = (id: number) => {
    const temp = labels?.map((label) => label);
    temp?.splice(id, 1);
    setLabels(temp);
  };

  return (
    <LabelContainer>
      <LabelSide>
        <StyledLabel>
          <Label htmlFor="text">Label</Label>
          <LabelInput
            type="text"
            value={label}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </StyledLabel>
        <SuggestButton onClick={handleClickSuggest}>Suggest</SuggestButton>
        {isSuggestOpen ? (
          <SuggestModal
            isVisible={isSuggestVisible}
            onConfirm={handleSuggest}
            onClose={handleSuggestClose}
          />
        ) : (
          <></>
        )}
      </LabelSide>
      <LabelBox>
        {labels?.map((label, index) => (
          <LabelItem key={index}>
            {label}
            <RemoveButton
              onClick={() => {
                handleRemove(index);
              }}
            >
              <CloseSVG src={CloseMark} alt="Close Mark" />
            </RemoveButton>
          </LabelItem>
        ))}
      </LabelBox>
    </LabelContainer>
  );
};

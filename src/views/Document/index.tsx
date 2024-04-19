import React, { useContext, useState } from "react";
import { Container } from "./style";
import { DocumentBar } from "../../components/DocumentBar";
import { DocumentsContext } from "../../contexts";
import { DocumentModal } from "../../components/DocumentModal";

export const DocumentView: React.FC = () => {
  const { documents } = useContext(DocumentsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalID, setModalID] = useState<number | null>(null);

  const openModal = (id: number) => {
    setModalID(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalID(null);
  };

  const goToFirst = () => {
    setModalID(0);
  };

  const goToLast = () => {
    setModalID(documents.length - 1);
  };

  const goToPrev = (id: number) => {
    if (id !== 0) setModalID(id - 1);
  };

  const goToNext = (id: number) => {
    if (id !== documents.length - 1) setModalID(id + 1);
  };

  return (
    <Container>
      {documents.map((document, index) => {
        return (
          <>
            <DocumentBar
              key={index}
              id={document.ID}
              title={document.title}
              onClick={() => openModal(document.ID)}
            />
            {modalID === document.ID && (
              <DocumentModal
                key={`DM${index}`}
                document={document}
                isOpen={isModalOpen}
                onClose={closeModal}
                onFirst={goToFirst}
                onLast={goToLast}
                onPrev={() => goToPrev(document.ID)}
                onNext={() => goToNext(document.ID)}
              />
            )}
          </>
        );
      })}
    </Container>
  );
};

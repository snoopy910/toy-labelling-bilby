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
    console.log("hello");
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
    setModalID(id - 1);
  };

  const goToNext = (id: number) => {
    setModalID(id + 1);
  };

  return (
    <Container>
      {documents.map((document) => {
        return (
          <>
            <DocumentBar
              id={document.ID}
              title={document.title}
              labels={document.label}
              onClick={() => openModal(document.ID)}
            />
            {modalID === document.ID && (
              <DocumentModal
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

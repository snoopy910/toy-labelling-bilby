import React, { useContext, useState } from "react";
import { Container } from "./style";
import { DocumentBar } from "../../components/DocumentBar";
import { DocumentModal } from "../../components/DocumentModal";
import { DocumentsContext } from "../../contexts";

export const DocumentView: React.FC = () => {
  const { documents, fetchDocuments } = useContext(DocumentsContext);

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
    setModalID(Math.max(id - 1, 0));
  };

  const goToNext = (id: number) => {
    setModalID(Math.min(id + 1, documents.length - 1));
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const e = event.currentTarget;
    if (e.scrollHeight - e.scrollTop === e.clientHeight) {
      fetchDocuments(documents.length);
    }
  };

  return (
    <Container onScroll={handleScroll}>
      {documents.map((document, index) => {
        return (
          <div key={index}>
            <DocumentBar
              ID={document.ID}
              title={document.title}
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
          </div>
        );
      })}
    </Container>
  );
};

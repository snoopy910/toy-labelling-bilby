import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DocumentsContextProvider } from "contexts";
import { PATH } from "consts";
import { HomePage, DocumentBarPage, DocumentPage } from "pages";
import { LayoutComponent } from "components";

const App: React.FC = () => {
  const [id, setId] = useState(0);
  return (
    <BrowserRouter>
      <DocumentsContextProvider id={id}>
        <LayoutComponent>
          <Routes>
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route
              path={PATH.DOCUMENTS}
              element={<DocumentBarPage setId={setId} />}
            />
            <Route path={PATH.DOCUMENT} element={<DocumentPage />} />
          </Routes>
        </LayoutComponent>
      </DocumentsContextProvider>
    </BrowserRouter>
  );
};

export default App;

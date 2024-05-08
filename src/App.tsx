import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DocumentsContextProvider } from "contexts";
import { PATH } from "consts";
import { HomePage, DocumentBarPage, DocumentPage } from "pages";
import { LayoutComponent } from "components";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DocumentsContextProvider>
        <LayoutComponent>
          <Routes>
            <Route path={PATH.HOME} element={<HomePage />} />
            <Route path={PATH.DOCUMENTS} element={<DocumentBarPage />} />
            <Route path={PATH.DOCUMENT} element={<DocumentPage />} />
          </Routes>
        </LayoutComponent>
      </DocumentsContextProvider>
    </BrowserRouter>
  );
};

export default App;
